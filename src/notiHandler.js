function guideme_notiHandler () {
  if (firstLoad) return;
  // type = [req, start, reject, complete]
  // numStar = [0, 1, 2, 3, 4, 5]
    window.addNoti = function (target = {displayName: 'USER', photoURL: './img/default.png'}, type, timeSent ='30/04/1975') {
        let item = newElement("DIV", "item")
            let content = newElement("DIV", 'content')
                let avatarContainer = newElement("DIV", "avatar-container")
                    let avatar = newElement("IMG", "avatar")
                    avatar.src = target.photoURL
                avatarContainer.append(avatar)
            content.append(avatarContainer)
                let info = newElement("DIV", "info")
                    let name = newElement("SPAN", "name", target.displayName)
                info.append(name)
                    let action = newElement("SPAN")
                    if (type == 'req') action.innerHTML = ' gửi bạn một yêu cầu'
                    if (type == 'start') action.innerHTML = ' chuyến đi của bạn đã bắt đầu !'
                    if (type == 'reject') action.innerHTML = ' đã từ chối yêu cầu'
                    if (type == 'complete') action.innerHTML = ' và bạn đã hoàn thành một chuyến đi !'
                info.append(action)
                    let footer = newElement("DIV", "footer")
                        let icon = newElement("SPAN", "icon "+type)
                            let i = newElement("I", "fas fa-paper-plane")
                            i.style.marginRight = "2px"
                        icon.append(i)
                    footer.append(icon)
                        let time = newElement("SPAN", "time", getTimeFormat(new Date(timeSent)))
                    footer.append(time)
                info.append(footer)
            content.append(info)
        item.append(content)
        notiBox.prepend(item)
    }

    window.notiComment = function (target, data) {
        let item = newElement("DIV", "item comment")
            let content = newElement("DIV", 'content')
                let avatarContainer = newElement("DIV", "avatar-container")
                    let avatar = newElement("IMG", "avatar")
                    avatar.src = target.photoURL
                avatarContainer.append(avatar)
            content.append(avatarContainer)
                let info = newElement("DIV", "info")
                    let name = newElement("SPAN", "name", target.displayName)
                info.append(name)
                    let rate = newElement("SPAN", "rate")
                    let tmp = data.rate
                    while (tmp--) {
                        let star = newElement("I", "fas fa-star")
                        rate.append(star)
                    }
                info.append(rate)
                    let action = newElement("P", "action"," "+data.comment)
                info.append(action)
                    let footer = newElement("DIV", "footer")
                        let icon = newElement("SPAN", "icon comment")
                            let i = newElement("I", "fas fa-comment-alt")
                            i.style.marginRight = "2px"
                        icon.append(i)
                    footer.append(icon)
                        let time = newElement("SPAN", "time", getTimeFormat(new Date(data.time)))
                    footer.append(time)
                info.append(footer)
            content.append(info)
        item.append(content)
        notiBox.prepend(item)
    }

    incProBar()
}