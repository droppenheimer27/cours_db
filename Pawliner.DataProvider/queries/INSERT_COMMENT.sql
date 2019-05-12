USE [Pawliner];

CREATE PROCEDURE [dbo].[INSERT_COMMENT]
	@content AS NVARCHAR(MAX),
	@userId AS NVARCHAR(MAX),
	@executorId AS INT
AS
BEGIN
	INSERT INTO [dbo].[Comments]
		([Content],
		[CreatedAt],
		[ExecutorId],
		[UserId])
	VALUES 
		(@content,
		CONVERT(NVARCHAR, GETDATE(), 11),
		@executorId,
		@userId) 
END;

DROP PROCEDURE [dbo].[INSERT_COMMENT];

EXECUTE [dbo].[INSERT_COMMENT] 'CONTENT', 'ZZZ', '1234', 1