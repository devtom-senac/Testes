using System.ComponentModel.DataAnnotations;

namespace StatusWS.Dtos
{
    public class LoginDto
    {
        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
