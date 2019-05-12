USE [Pawliner];

CREATE PROCEDURE [dbo].[GET_EXECUTOR_PHOTOS]
	@id AS INT
AS
BEGIN
	SELECT [Photos].Id,
			[Photos].FileName,
			[Photos].Path
		FROM [Executors]
		LEFT JOIN [PhotoExecutors] ON [Executors].Id = [PhotoExecutors].Executor_Id
		LEFT JOIN [Photos] ON [Photos].Id = [PhotoExecutors].Photo_Id
		WHERE [Executors].Id = @id;
END;

EXECUTE [GET_EXECUTOR_PHOTOS] 36;