namespace Alcateia.Alcateia.Domain.Entities
{
    public class TeamAttribute
    {
        public Guid Id { get; private set; }
        public Guid TeamId { get; private set; }
        public Guid HealthAttributeId { get; private set; }
        public bool IsActive { get; private set; }
        public DateTime AssignedAt { get; private set; }

        public Team Team { get; private set; }
        public HealthAttribute Attribute { get; private set; }

        public TeamAttribute(Guid teamId, Guid healthAttributeId)
        {
            if (teamId == Guid.Empty)
                throw new ArgumentException("A associação requer um ID de equipe válido.", nameof(teamId));
            if (healthAttributeId == Guid.Empty)
                throw new ArgumentException("A associação requer um ID de atributo de saúde válido.", nameof(healthAttributeId));

            this.Id = Guid.NewGuid();
            this.TeamId = teamId;
            this.HealthAttributeId = healthAttributeId;
            this.IsActive = true;
            this.AssignedAt = DateTime.UtcNow;
        }

        public void Deactivate()
        {
            this.IsActive = false;
        }

        private TeamAttribute() { }
    }
}
