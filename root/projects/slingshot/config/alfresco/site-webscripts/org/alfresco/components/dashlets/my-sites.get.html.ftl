<script type="text/javascript">//<![CDATA[
   new Alfresco.MySites("${args.htmlid}");
//]]></script>

<div class="dashlet">
  <div class="title">${msg("header.mySites")}</div>
  <div class="toolbar">
    <a href="#" id="${args.htmlid}-createSite-button">${msg("link.createSite")}</a>
  </div>
  <div class="body scrollableList">
<#if sites?exists>
   <#list sites as site>
      <div class="text-list-item">
        <a href="${url.context}/page/collaboration-dashboard?site=${site.shortName}">${site.title}</a>
      </div>
   </#list>
<#else>
      <span>${msg("label.noSites")}</span>
</#if>
  </div>
</div>

