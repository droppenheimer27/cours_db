USE [Pawliner];

CREATE PROCEDURE [dbo].[GET_RESPONDS]
	@id AS INT
AS
BEGIN
	SELECT [Responds].[Id],
		[Responds].[Content],
		[Responds].[CreatedAt],
		[Responds].[Status],
		[Responds].[ExecutorId],
		[Executors].FirstName,
		[Executors].LastName,
		[Executors].ShortJuridicalName
	FROM [Pawliner].[dbo].[Responds]
	INNER JOIN [Executors] ON [Executors].Id = [Responds].ExecutorId
	WHERE [Responds].[OrderId] = @id;
END;

DROP PROCEDURE GET_RESPONDS;

EXECUTE [GET_RESPONDS] 11;