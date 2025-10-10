namespace Alcateia.Alcateia.Domain.Entities
{
    public class User
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public Guid TeamId { get; private set; }
        public Team Team { get; private set; }
        public bool IsActive { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public ICollection<MoodCheckin> MoodCheckins { get; private set; }

        public User(string name, string email, Guid teamId)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("O nome do usuário é obrigatório.", nameof(name));
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("O email do usuário é obrigatório.", nameof(email));
            if (teamId == Guid.Empty)
                throw new ArgumentException("O usuário deve ser associado a uma equipe válida.", nameof(teamId));

            this.Id = Guid.NewGuid();
            this.Name = name;
            this.Email = email;
            this.TeamId = teamId;
            this.IsActive = true;
            this.CreatedAt = DateTime.UtcNow;
            this.MoodCheckins = new List<MoodCheckin>();
        }

        public void UpdateProfile(string newName)
        {
            if (string.IsNullOrWhiteSpace(newName))
                throw new ArgumentException("O novo nome deve ser válido.", nameof(newName));

            this.Name = newName;
        }

        public void Deactivate()
        {
            this.IsActive = false;
        }

        private User() { }
    }
}
