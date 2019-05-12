CREATE PROCEDURE [dbo].[GET_COMMENTS]
	@id AS INT
AS
BEGIN
	SELECT [Comments].[Id],
		[Comments].[Content],
		[Comments].[CreatedAt],
		[Comments].[UserId],
		[AspNetUsers].UserName
	FROM [Pawliner].[dbo].[Comments]
	INNER JOIN [AspNetUsers] ON [AspNetUsers].Id = [Comments].UserId
	WHERE [Comments].ExecutorId = @id;
END;

DROP PROCEDURE [GET_COMMENTS];

EXECUTE [GET_COMMENTS] 8;