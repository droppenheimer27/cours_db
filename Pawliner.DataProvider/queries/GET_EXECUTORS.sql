USE [Pawliner];

DROP PROCEDURE GET_EXECUTORS;
DROP FUNCTION SEARCH_EXECUTORS;
DROP FUNCTION FILTER_EXECUTORS;
DROP TYPE EXECUTOR_TABLE_TYPE;

CREATE TYPE EXECUTOR_TABLE_TYPE AS TABLE
(
	[Id] [int] PRIMARY KEY NOT NULL,
	[FirstName] [nvarchar](128) NOT NULL,
	[Patronymic] [nvarchar](128) NOT NULL,
	[LastName] [nvarchar](128) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[ExecutorType] [int] NOT NULL,
	[UserId] [nvarchar](128) NULL,
	[PhoneNumber] [nvarchar](32) NULL,
	[Status] [int] NOT NULL,
	[PayerAccountNumber] [int] NULL,
	[FullJuridicalName] [nvarchar](128) NULL,
	[ShortJuridicalName] [nvarchar](128) NULL,
	FileName NVARCHAR(MAX),
	Path NVARCHAR(MAX),
	ServiceClassiferId INT NULL,
	ServiceClassiferDescription NVARCHAR(MAX) NOT NULL
);

CREATE PROCEDURE GET_EXECUTORS
	@search AS NVARCHAR(128),
	@filter AS NVARCHAR(MAX)
AS
BEGIN
	DECLARE @table dbo.EXECUTOR_TABLE_TYPE;
	DECLARE @table2 dbo.EXECUTOR_TABLE_TYPE;
	DECLARE @table3 dbo.EXECUTOR_TABLE_TYPE;

	INSERT @table
		SELECT [Executors].[Id],
			[Executors].[FirstName],
			[Executors].[Patronymic],
			[Executors].[LastName],
			[Executors].[Description],
			[Executors].[ExecutorType],
			[Executors].[UserId],
			ISNULL([PhoneNumber], 0) AS [PhoneNumber],
			[Executors].[Status],
			ISNULL([PayerAccountNumber], 0) AS [PayerAccountNumber],
			[Executors].[FullJuridicalName],
			[Executors].[ShortJuridicalName],
			[Photos].FileName,
			[Photos].Path,
			[ServiceClassifers].Id,
			[ServiceClassifers].Description
		FROM [Executors]
		LEFT JOIN [Photos] ON [Photos].Id = 
		(SELECT TOP 1 [PhotoExecutors].Photo_Id 
		FROM [PhotoExecutors]
		WHERE [Executors].Id = [PhotoExecutors].Executor_Id)
		LEFT JOIN [ServiceClassifers] ON [ServiceClassifers].Id = 
		(SELECT TOP 1 [ServiceClassiferExecutors].ServiceClassifer_Id 
		FROM [ServiceClassiferExecutors]
		WHERE [Executors].Id = [ServiceClassiferExecutors].Executor_Id)
		ORDER BY [Executors].Id DESC

	INSERT @table2 SELECT * FROM SEARCH_EXECUTORS(@table, @search);
	IF LEN(@filter) = 0
		BEGIN
			SELECT * FROM @table2
			ORDER BY Id DESC;
		END;
	ELSE
		BEGIN
			INSERT @table3 SELECT * FROM FILTER_EXECUTORS(@table2, @filter);
			SELECT * FROM @table3
			ORDER BY Id DESC;
		END;
END;  

CREATE FUNCTION SEARCH_EXECUTORS(@table AS dbo.EXECUTOR_TABLE_TYPE READONLY, @search AS NVARCHAR(128)) 
RETURNS TABLE AS 
RETURN 
	SELECT * FROM @table
	WHERE [FirstName] LIKE '%' + @search + '%' OR
	[LastName] LIKE '%' + @search + '%' OR
	[Patronymic] LIKE '%' + @search + '%' OR
	[ShortJuridicalName] LIKE '%' + @search + '%' OR
	[FullJuridicalName] LIKE '%' + @search + '%';


CREATE FUNCTION FILTER_EXECUTORS(@table AS dbo.EXECUTOR_TABLE_TYPE READONLY, @filter AS NVARCHAR(MAX)) 
RETURNS TABLE AS 
RETURN 
	SELECT [Id],
	[FirstName],
	[Patronymic],
	[LastName],
	[Description],
	[ExecutorType],
	[UserId],
	[PhoneNumber],
	[Status],
	[PayerAccountNumber],
	[FullJuridicalName],
	[ShortJuridicalName],
	FileName,
	Path,
	ServiceClassiferId,
	ServiceClassiferDescription
	FROM @table
	INNER JOIN SERVICES_TO_TABLE(@filter, DEFAULT) AS [Services] ON [ServiceClassiferId] = [Services].str


EXECUTE GET_EXECUTORS '', ''