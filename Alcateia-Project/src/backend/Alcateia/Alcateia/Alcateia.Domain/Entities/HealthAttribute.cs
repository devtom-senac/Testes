namespace Alcateia.Alcateia.Domain.Entities
{
    public class HealthAttribute
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public decimal Weight { get; private set; }
        public string CalculatorKey { get; private set; }
        public bool IsActive { get; private set; }

        public HealthAttribute(string name, string description, decimal weight, string calculatorKey)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("O nome do atributo é obrigatório.", nameof(name));
            if (weight <= 0 || weight > 1)
                throw new ArgumentException("O peso deve ser um valor entre 0 e 1 (exclusivo).", nameof(weight));
            if (string.IsNullOrWhiteSpace(calculatorKey))
                throw new ArgumentException("A chave da calculadora é obrigatória.", nameof(calculatorKey));

            this.Id = Guid.NewGuid();
            this.Name = name;
            this.Description = description;
            this.Weight = weight;
            this.CalculatorKey = calculatorKey;
            this.IsActive = true;
        }

        public void UpdateWeight(decimal newWeight)
        {
            if (newWeight <= 0 || newWeight > 1)
                throw new ArgumentException("O novo peso deve ser um valor entre 0 e 1 (exclusivo).", nameof(newWeight));

            this.Weight = newWeight;
        }

        private HealthAttribute() { }
    }
}
