USE [Pawliner];

CREATE PROCEDURE [dbo].[IS_EXECUTOR]
	@userId AS NVARCHAR(MAX),
	@id AS INT OUTPUT
AS
BEGIN
	SELECT @id = [Executors].[Id]
	FROM [Pawliner].[dbo].[Executors]
	WHERE [UserId] = @userId;
END;

DROP PROCEDURE [IS_EXECUTOR];

EXECUTE [IS_EXECUTOR] '0', 0;
