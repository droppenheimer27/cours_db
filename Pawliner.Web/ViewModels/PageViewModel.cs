namespace Pawliner.Web.ViewModels
{
    public class PageViewModel
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }

        //public PageViewModel(int count, int currentPage, int pageSize)
        //{
        //    CurrentPage = currentPage;
        //    //PageSize = (int)System.Math.Ceiling(count / (double)pageSize);
        //}

        public bool HasPreviousPage
        {
            get
            {
                return (CurrentPage > 1);
            }
        }

        public bool HasNextPage
        {
            get
            {
                return (CurrentPage < PageSize);
            }
        }
    }
}
