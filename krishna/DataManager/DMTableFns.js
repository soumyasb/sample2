import React from 'react';
import { Button } from 'antd';

export const getModalSettings = (actionType, onOk, onCancel, dmType) => {
    let title, okText = '';
    let footer = [];

    switch (actionType) {
        case 'create':
            title = `Create ${dmType}`;
            okText = 'Create';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
            ];
            break;
        case 'edit':
            title = `Edit ${dmType}`;
            okText = 'Save';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
            ];
            break;
        case 'details':
            title = `${dmType} Details`;
            okText = 'Details';
            footer = [
                <Button key="Close" onClick={onCancel}>Close</Button>
            ];
            break;
        case 'delete':
            title = `Delete ${dmType}`;
            okText = 'Delete';
            footer = [
                <Button key="Cancel" onClick={onCancel}>Cancel</Button>,
                <Button type="primary" key="Ok" onClick={onOk}>{okText}</Button>
            ];
            break;
        default:
            title = `Create ${dmType}`;
    }

    return {
        title,
        okText,
        footer,
    }

}