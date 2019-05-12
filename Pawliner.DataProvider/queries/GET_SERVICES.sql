USE [Pawliner];

CREATE PROCEDURE [GET_SERVICES]
AS
BEGIN
	CREATE TABLE #SERVICES
	(
		[Id] INT,
		[ServiceClassiferDescription] NVARCHAR(MAX),
		[ServicesDescriptions] NVARCHAR(MAX)
	);

	DECLARE @id AS INT,
	@description AS NVARCHAR(MAX),
	@descriptions AS NVARCHAR(MAX);
	
	DECLARE curs CURSOR FOR
	SELECT [Id], [Description] FROM [Services];

	OPEN curs;
	FETCH NEXT FROM curs INTO @id, @description;
	
	WHILE @@FETCH_STATUS = 0
	BEGIN
		SELECT @descriptions = COALESCE(@descriptions + ',', '') + CAST([ServiceClassifers].Id AS NVARCHAR(MAX)) + '---' + [ServiceClassifers].Description
		FROM [ServiceClassifers]
		WHERE [ServiceClassifers].Service_Id = @id;

		INSERT INTO #SERVICES VALUES (@id, @description, @descriptions);
		SELECT @descriptions = '';

		FETCH NEXT FROM curs INTO @id, @description;
	END;

	CLOSE curs;
	DEALLOCATE curs;

	SELECT [Id], 
	[ServiceClassiferDescription], 
	[ServicesDescriptions] 
	FROM #SERVICES;

	DROP TABLE #SERVICES;
END;

DROP PROCEDURE GET_SERVICES;

EXECUTE GET_SERVICES;