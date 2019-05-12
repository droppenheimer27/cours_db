USE [Pawliner];

CREATE PROCEDURE [dbo].[GET_ORDER_PHOTOS]
	@id AS INT
AS
BEGIN
	SELECT [Photos].Id,
			[Photos].FileName,
			[Photos].Path
		FROM [Orders]
		LEFT JOIN [OrderPhotoes] ON [Orders].Id = [OrderPhotoes].Order_Id
		LEFT JOIN [Photos] ON [Photos].Id = [OrderPhotoes].Photo_Id
		WHERE [Orders].Id = @id;
END;

EXECUTE [GET_ORDER_PHOTOS] 8;