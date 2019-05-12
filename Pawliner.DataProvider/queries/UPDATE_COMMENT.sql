USE [Pawliner];

CREATE PROCEDURE [dbo].[UPDATE_COMMENT]
	@id AS INT,
	@content AS NVARCHAR(MAX)
AS
BEGIN
	UPDATE [dbo].[Comments] SET [Content] = @content
	WHERE [Id] = @id;
END;

DROP PROCEDURE [dbo].[UPDATE_COMMENT];

EXECUTE [dbo].[UPDATE_COMMENT] 85, 'ASD'