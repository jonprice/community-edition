<import resource="classpath:/alfresco/templates/org/alfresco/import/alfresco-util.js">

/* Get filters */
function getFilters()
{
   var myConfig = new XML(config.script),
      filters = [];

   for each (var xmlFilter in myConfig..filter)
   {
      filters.push(xmlFilter.@type.toString());
   }
   return filters
}

/* Max Items */
function getMaxItems()
{
   var myConfig = new XML(config.script),
      maxItems = myConfig["max-items"];

   if (maxItems)
   {
      maxItems = myConfig["max-items"].toString();
   }
   return parseInt(maxItems && maxItems.length > 0 ? maxItems : 50, 10);
}

model.preferences = AlfrescoUtil.getPreferences("org.alfresco.share.mydocuments.dashlet");
model.filters = getFilters();
model.maxItems = getMaxItems();

function main()
{
   // Widget instantiation metadata...
   model.prefFilter = model.preferences.filter;
   if (model.prefFilter == null)
   {
      model.prefFilter = "recentlyModifiedByMe";
   }

   model.prefSimpleView = model.preferences.simpleView;
   if (model.prefSimpleView == null)
   {
      model.prefSimpleView = true;
   }

   var myDocs = {
      id : "MyDocuments",
      name : "Alfresco.dashlet.MyDocuments",
      options : {
         filter : model.prefFilter,
         maxItems : model.maxItems,
         simpleView : model.prefSimpleView,
         validFilters : model.filters
      }
   };

   var dashletResizer = {
      id : "DashletResizer",
      name : "Alfresco.widget.DashletResizer",
      initArgs : ["\"" + args.htmlid + "\"", "\"" + instance.object.id + "\""],
      useMessages: false
   };

   var dashletTitleBarActions = {
      id : "DashletTitleBarActions", 
      name : "Alfresco.widget.DashletTitleBarActions",
      useMessages : false,
      options : {
         actions: [
             {
                cssClass: "help",
                bubbleOnClick:
                {
                   message: msg.get("dashlet.help")
                },
                tooltip: msg.get("dashlet.help.tooltip")
             }
         ]
      }
   };
   model.widgets = [myDocs, dashletResizer, dashletTitleBarActions];
}

main();