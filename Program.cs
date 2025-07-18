using BlogManager.Extentions;

var builder = WebApplication.CreateBuilder(args);

try
{
    WebApplication.CreateBuilder(args)
        .ConfigServices()
        .ConfigPipLines();
}
catch (Exception? exception)
{
    // Log.Error($"Stopped program because of exception \n exception is : {exception.Message}  \n stack trace : {exception.StackTrace}");
    // throw;
}
finally
{
    // await Log.CloseAndFlushAsync();
}
