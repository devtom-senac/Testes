namespace Alcateia.Domain.Interfaces
{
    public interface IAttributeCalculator
    {
        // Chave de identificação única para a calculadora (ex: "MoodCheckinV1")
        string Key { get; }

        // Recebe os dados brutos de um check-in/métrica e retorna o peso.
        // O tipo 'object' é usado para permitir que esta interface seja flexível 
        // e receba dados de 'MoodCheckin', 'ProductivityMetric', etc., no futuro.
        decimal CalculateWeight(object data);
    }
}
