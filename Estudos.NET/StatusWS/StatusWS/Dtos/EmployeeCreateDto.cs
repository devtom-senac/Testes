using System.ComponentModel.DataAnnotations;

namespace StatusWS.Dtos
{
    public class EmployeeCreateDto
    {
        public string Name { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 4)] 
        public string Password { get; set; }
        public string Position { get; set; }
        public string? Photo { get; set; }
    }
}
