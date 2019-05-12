USE [Pawliner];

DROP PROCEDURE [GET_EXECUTOR];

CREATE PROCEDURE [dbo].[GET_EXECUTOR]
	@id AS INT
AS
BEGIN
	DECLARE @descriptions NVARCHAR(MAX); 
	SELECT @descriptions = COALESCE(@descriptions + ', ', '') + [ServiceClassifers].Description 
	FROM [Executors]
	INNER JOIN [ServiceClassiferExecutors] ON [Executors].Id = [ServiceClassiferExecutors].Executor_Id
	INNER JOIN [ServiceClassifers] ON [ServiceClassiferExecutors].ServiceClassifer_Id = [ServiceClassifers].Id
	WHERE [Executors].Id = @id;

	SELECT DISTINCT [Executors].Id,
		[Executors].Description,
		[Executors].ExecutorType,
		[Executors].FirstName,
		[Executors].LastName,
		[Executors].Patronymic,
		ISNULL([PhoneNumber], 0) AS [PhoneNumber],
		[Executors].Status,
		[Executors].UserId,
		[Executors].ShortJuridicalName,
		[Executors].FullJuridicalName,
		ISNULL(PayerAccountNumber, 0) AS PayerAccountNumber,
		@descriptions AS ServiceClassiferDescription,
		'' AS ServiceClassiferId,
		'' AS FileName,
		'' AS Path
	FROM [Executors]
	INNER JOIN [ServiceClassiferExecutors] ON [Executors].Id = [ServiceClassiferExecutors].Executor_Id
	INNER JOIN [ServiceClassifers] ON [ServiceClassiferExecutors].ServiceClassifer_Id = [ServiceClassifers].Id
	WHERE [Executors].Id = @id;
END;

EXECUTE [GET_EXECUTOR] 4;