using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using StatusWS.Data;
using StatusWS.Dtos;
using StatusWS.Models;

namespace StatusWS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<Employee> _passwordHasher;

        public EmployeeController(AppDbContext context, IPasswordHasher<Employee> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetEmployees()
        {
            var employees = await _context.Employees
                .Where(e => e.IsActive)
                .Include(e => e.Status)
                    .ThenInclude(s => s.StatusType)
                .Select(e => new EmployeeDto
                {
                    EmployeeId = e.EmployeeId,
                    Name = e.Name,
                    Position = e.Position,
                    Photo = e.Photo,
                    CreatedAt = e.CreatedAt,
                    IsActive = e.IsActive,
                    Status = new StatusDto
                    {
                        StatusId = e.Status.StatusId,
                        CustomText = e.Status.CustomText,
                        UpdateAt = e.Status.UpdateAt,
                        StatusType = new StatusTypeDto
                        {
                            StatusTypeId = e.Status.StatusType.StatusTypeId,
                            Description = e.Status.StatusType.Description,
                            IconUrl = e.Status.StatusType.IconUrl
                        }
                    }
                })
                .ToListAsync();

            return Ok(employees);
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeDto>> PostEmployee(EmployeeCreateDto employeeCreateDto)
        {
            var defaultStatus = new Status
            {
                CustomText = "Nenhum status definido",
                UpdateAt = DateTime.UtcNow,
                StatusTypeId = 1
            };

            var employee = new Employee
            {
                Name = employeeCreateDto.Name,
                PasswordHash = _passwordHasher.HashPassword(null, employeeCreateDto.Password),
                Position = employeeCreateDto.Position,
                Photo = employeeCreateDto.Photo ?? "https://tarefas.websupply.com.br/painel/assets/userDefault-uMDAqLiz.png",
                Status = defaultStatus
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            await _context.Entry(employee).Reference(e => e.Status).LoadAsync();
            await _context.Entry(employee.Status).Reference(s => s.StatusType).LoadAsync();

            var employeeDto = new EmployeeDto
            {
                EmployeeId = employee.EmployeeId,
                Name = employee.Name,
                Position = employee.Position,
                Photo = employee.Photo,
                CreatedAt = employee.CreatedAt,
                IsActive = employee.IsActive,
                Status = new StatusDto
                {
                    StatusId = employee.Status.StatusId,
                    CustomText = employee.Status.CustomText,
                    UpdateAt = employee.Status.UpdateAt,
                    StatusType = new StatusTypeDto
                    {
                        StatusTypeId = employee.Status.StatusType.StatusTypeId,
                        Description = employee.Status.StatusType.Description,
                        IconUrl = employee.Status.StatusType.IconUrl
                    }
                }
            };

            return CreatedAtAction(nameof(GetEmployees), new { id = employeeDto.EmployeeId }, employeeDto);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var employee = await _context.Employees
                .FirstOrDefaultAsync(e => e.EmployeeId == loginDto.EmployeeId && e.IsActive);

            if (employee == null)
            {
                return Unauthorized("Credenciais inválidas.");
            }

            var result = _passwordHasher.VerifyHashedPassword(employee, employee.PasswordHash, loginDto.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Credenciais inválidas.");
            }

            return Ok(new { Message = "Login bem-sucedido!", EmployeeId = employee.EmployeeId, Name = employee.Name });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EmployeeUpdateDto employeeUpdateDto)
        {
            var employee = await _context.Employees
                .Include(e => e.Status)
                .FirstOrDefaultAsync(e => e.EmployeeId == id);

            if (employee == null)
            {
                return NotFound();
            }

            if (employeeUpdateDto.StatusId != null)
            {
                employee.Status.StatusTypeId = employeeUpdateDto.StatusId.Value;
                employee.Status.UpdateAt = DateTime.UtcNow;

                if (employeeUpdateDto.StatusId == 1)
                {
                    employee.Status.CustomText = null;
                }
            }

            if (employeeUpdateDto.CustomText != null)
            {
                employee.Status.CustomText = employeeUpdateDto.CustomText;
                employee.Status.UpdateAt = DateTime.UtcNow;
            }

            if (employeeUpdateDto.Photo != null)
            {
                employee.Photo = employeeUpdateDto.Photo;
            }

            if (employeeUpdateDto.IsActive != null)
            {
                employee.IsActive = employeeUpdateDto.IsActive.Value;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            employee.IsActive = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}