namespace Alcateia.Alcateia.Domain.Entities
{
    public class Team
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public bool IsActive { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public ICollection<User> Members { get; private set; }

        public Team(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("O nome da equipe é obrigatório.", nameof(name));
            }

            this.Id = Guid.NewGuid();
            this.Name = name;
            this.IsActive = true;
            this.CreatedAt = DateTime.UtcNow;
            this.Members = new List<User>();
        }

        public void UpdateName(string newName)
        {
            if (string.IsNullOrWhiteSpace(newName))
            {
                throw new ArgumentException("O novo nome da equipe é obrigatório.", nameof(newName));
            }
            this.Name = newName;
        }

        public void Deactivate()
        {
            this.IsActive = false;
        }

        private Team() { }
    }
}
