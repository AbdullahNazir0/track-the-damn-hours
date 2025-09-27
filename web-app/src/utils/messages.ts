import { type MessageInstance } from 'antd/es/message/interface';

export function showLoadingMessage(messageApi: MessageInstance, key: string, content: string) {
    messageApi.open({ key, type: "loading", content, duration: 0 });
}

export function showSuccessMessage(messageApi: MessageInstance, key: string, content: string) {
  messageApi.open({ key, type: "success", content, duration: 2 });
}

export function showErrorMessage(messageApi: MessageInstance, key: string, content: string) {
  messageApi.open({ key, type: "error", content, duration: 2 });
}
