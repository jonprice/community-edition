function main()
{
   // Widget instantiation metadata...
   var wikiToolbar = {
      id : "WikiToolbar", 
      name : "Alfresco.WikiToolbar",
      options : {
         siteId : (page.url.templateArgs.site != null) ? page.url.templateArgs.site : "",
         title : (page.url.templateArgs.title != null) ? page.url.templateArgs.title : "",
         showBackLink : (args.showBackLink == "true")
      }
   };
   model.widgets = [wikiToolbar];
}

main();

