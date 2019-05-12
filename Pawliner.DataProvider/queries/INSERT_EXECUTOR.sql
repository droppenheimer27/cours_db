USE [Pawliner];

GO
CREATE PROCEDURE [dbo].[INSERT_EXECUTOR]
	@firstName AS NVARCHAR(MAX),
	@lastName AS NVARCHAR(MAX),
	@patronymic AS NVARCHAR(MAX),
	@description AS NVARCHAR(MAX),
	@executorType AS INT,
	@userId AS NVARCHAR(MAX),
	@phoneNumber AS NVARCHAR(MAX),
	@payerAccountNumber INT,
	@fullJuridicalName AS NVARCHAR(MAX),
	@shortJuridicalName AS NVARCHAR(MAX),
	@servicesId AS NVARCHAR(MAX)
AS
BEGIN
	DECLARE @id AS INT,
		@executorId AS INT;
	DECLARE curs CURSOR FOR
	SELECT str AS [ServiceId] FROM SERVICES_TO_TABLE(@servicesId, DEFAULT)

	INSERT INTO [dbo].[Executors]
			   ([FirstName]
			   ,[Patronymic]
			   ,[LastName]
			   ,[Description]
			   ,[ExecutorType]
			   ,[UserId]
			   ,[PhoneNumber]
			   ,[Status]
			   ,[PayerAccountNumber]
			   ,[FullJuridicalName]
			   ,[ShortJuridicalName])
		 VALUES
			   (@firstName
			   ,@lastName
			   ,@patronymic
			   ,@description
			   ,@executorType
			   ,@userId
			   ,@phoneNumber
			   ,2
			   ,ISNULL(@payerAccountNumber, 0)
			   ,ISNULL(@fullJuridicalName, '')
			   ,ISNULL(@shortJuridicalName, ''));

	SELECT @executorId = [Id] FROM [Executors]
	WHERE [UserId] = @userId;

	OPEN curs;
	FETCH NEXT FROM curs INTO @id;
	
	WHILE @@FETCH_STATUS = 0
	BEGIN
		INSERT INTO [ServiceClassiferExecutors]
		VALUES (@id, @executorId)

		FETCH NEXT FROM curs INTO @id;
	END;

	CLOSE curs;
	DEALLOCATE curs;

END;

SELECT str AS [ServiceId] FROM SERVICES_TO_TABLE('3, 1, 2', DEFAULT)
SELECT * FROM [Executors];
SELECT * FROM [AspNetUsers];
SELECT * FROM [ServiceClassiferExecutors];

DROP PROCEDURE [dbo].[INSERT_EXECUTOR];

EXECUTE [dbo].[INSERT_EXECUTOR] 'DDDAAA', 'AAADDD', 'AD', 'SOMETHING', 1, '00000000-0000-0000-0000-000000000000', '123123123', '', '', '', '4, 5, 6';