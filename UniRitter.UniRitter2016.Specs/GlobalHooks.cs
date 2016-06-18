using Microsoft.Owin.Hosting;
using TechTalk.SpecFlow;
using UniRitter.UniRitter2016.Services;
using UniRitter.UniRitter2016.Services.Implementation;

namespace UniRitter.UniRitter2016.Specs
{
    [Binding]
    public sealed class GlobalHooks
    {
        [BeforeTestRun]
        public static void BeforeTestRun()
        {
            var baseAddress = "http://localhost:49556/";

            WebApp.Start<Startup>(baseAddress);
            Startup.kernel.Rebind(typeof(IRepository<>)).To(typeof(InMemoryRepository<>));
        }

        [AfterTestRun]
        public static void AfterTestRun()
        {
        }
    }
}