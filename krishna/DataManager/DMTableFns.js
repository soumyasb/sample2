import React from 'react';
import { Button } from 'antd';

export const DM_EDIT_ACTION_TYPE = 'edit';
export const DM_ADD_ACTION_TYPE = 'create';
export const DM_DELETE_ACTION_TYPE = 'delete';
export const DM_DETAILS_ACTION_TYPE = 'details';

export const getModalSettings = (actionType, onOk, onCancel, dmType) => {
    let title, okText = '';
    let footer = [];
    const okButton = okText => <Button type="primary" key="Ok" onClick={() => onOk(actionType)}>{okText}</Button>;

    switch (actionType) {
        case DM_ADD_ACTION_TYPE:
            title = `Create ${dmType}`;
            okText = 'Create';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                okButton(okText)
            ];
            break;
        case DM_EDIT_ACTION_TYPE:
            title = `Edit ${dmType}`;
            okText = 'Save';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                okButton(okText)
            ];
            break;
        case DM_DETAILS_ACTION_TYPE:
            title = `${dmType} Details`;
            okText = 'Details';
            footer = [
                <Button key="Close" onClick={onCancel}>Close</Button>
            ];
            break;
        case DM_DELETE_ACTION_TYPE:
            title = `Delete ${dmType}`;
            okText = 'Delete';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                okButton(okText)
            ];
            break;
        default:
            title = `Create ${dmType}`;
    }

    return {
        title,
        //okText,
        footer,
    }
}