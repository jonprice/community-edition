<@markup id="css" >
   <#-- CSS Dependencies -->
   <@link rel="stylesheet" type="text/css" href="${url.context}/res/components/dashlets/my-sites.css"  group="dashlets" />
   <@link rel="stylesheet" type="text/css" href="${url.context}/res/modules/create-site.css"  group="dashlets" />
   <@link rel="stylesheet" type="text/css" href="${url.context}/res/modules/delete-site.css"  group="dashlets" />
</@>

<@markup id="js">
   <#-- JavaScript Dependencies -->
   <@script type="text/javascript" src="${url.context}/res/components/dashlets/my-sites.js" group="dashlets"/>
   <@script type="text/javascript" src="${url.context}/res/modules/create-site.js" group="dashlets"/>
   <@script type="text/javascript" src="${url.context}/res/modules/delete-site.js" group="dashlets"/>   
</@>

<@markup id="widgets">
   <@createWidgets group="dashlets"/>
</@>

<@markup id="html">
   <@uniqueIdDiv>
      <#assign id = args.htmlid>
      <#assign dashboardconfig=config.scoped['Dashboard']['dashboard']>
      <#assign jsid = args.htmlid?js_string>
      <div class="dashlet my-sites">
         <div class="title">${msg("header")}</div>
         <div class="toolbar flat-button">
            <div class="hidden">
               <span class="align-left yui-button yui-menu-button" id="${id}-type">
                  <span class="first-child">
                     <button type="button" tabindex="0">${msg("filter.all")}</button>
                  </span>
               </span>
               <select id="${id}-type-menu">
                  <option value="all">${msg("filter.all")}</option>
                  <option value="favSites">${msg("filter.favSites")}</option>
               </select>
               <span class="align-right yui-button-align">
                  <span class="first-child">
                     <a href="#" id="${id}-createSite-button" class="theme-color-1">
                        <img src="${url.context}/res/components/images/site-16.png" style="vertical-align: text-bottom" />
                        ${msg("link.createSite")}</a>
                  </span>
               </span>
               <div class="clear"></div>
            </div>
         </div>
         <div id="${id}-sites" class="body scrollableList" <#if args.height??>style="height: ${args.height}px;"</#if>></div>
      </div>
   </@>
</@>


<script type="text/javascript">//<![CDATA[
(function()
{
   new Alfresco.dashlet.MySites("${jsid}").setOptions(
   {
      imapEnabled: ${imapServerEnabled?string},
      listSize: ${dashboardconfig.getChildValue('summary-list-size')!100}
   }).setMessages(${messages});
   new Alfresco.widget.DashletResizer("${jsid}", "${instance.object.id}");
   new Alfresco.widget.DashletTitleBarActions("${jsid}").setOptions(
   {
      actions:
      [
         {
            cssClass: "help",
            bubbleOnClick:
            {
               message: "${msg("dashlet.help")?js_string}"
            },
            tooltip: "${msg("dashlet.help.tooltip")?js_string}"
         }
      ]
   });
})();
//]]></script>

