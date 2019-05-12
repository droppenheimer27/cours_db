USE [Pawliner];

CREATE PROCEDURE [dbo].[GET_SERVICE_ID] 
	@service AS NVARCHAR(MAX),
	@id AS INT OUT
AS 
BEGIN
	SELECT @id = [ServiceClassifers].[Id]
	FROM [Pawliner].[dbo].[ServiceClassifers]
	WHERE [Description] = @service; 
END;

DROP PROCEDURE [GET_SERVICE_ID];

EXECUTE [GET_SERVICE_ID] '', 0;