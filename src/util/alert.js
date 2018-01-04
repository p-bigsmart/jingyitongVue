import { AlertModule } from 'vux'

export const p_alert = (title, content) => {
    return (
        AlertModule.show({
            title: title,
            content: content
        })
    )
}

export const p_alert_error = () => {
    return (
        AlertModule.show({
            title: "网络故障",
            content: "请手动刷新页面！"
        })
    )
}

export const p_alert_hide = (title, content, onHide) => {
    return (
        AlertModule.show({
            title: title,
            content: content,
            onHide: onHide
        })
    )
}