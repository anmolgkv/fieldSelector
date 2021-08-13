<aura:application extends="force:slds">

    <aura:attribute name="objectName" type="String" access="public" default="Account" />

    <aura:attribute name="isActive" type="Boolean" access="private" />
    <aura:attribute name="fieldName" type="String" access="private" />
    <aura:attribute name="fieldCompleteName" type="String" access="private" />

    <aura:handler name="init" value="{!this}" action="{!c.init}" />

    <aura:if isTrue="{!v.isActive}">
        <c:FieldSelector aura:id="fieldSelector" onFieldSelection="{!c.setSelectedField}" />

        <aura:set attribute="else">
            <pre>
                objectName: {!v.objectName}
                fieldName: {!v.fieldName}
                fieldCompleteName: {!v.fieldCompleteName}
            </pre>

            <lightning:button label="Select again" onclick="{!c.init}" />
        </aura:set>
    </aura:if>
</aura:application>