function guideme_card() {
	while (cardContainer.children[0] != null) cardContainer.children[0].remove()
	
	getInfo(user, profilePane)
	for (let k in userList) {
		if (k != user.uid && userList[k].moreinfo) showCard(userList[k]);
	}

	$('[data-toggle="tooltip"]').tooltip()
	filterCard();

	if (firstLoad) return;

	function showCard(target) {
		let src = target.photoURL
		let name = target.displayName
		let quote = target.quote ? target.quote : 'Nice to meet you'
		
		let avatarContainer = newElement('DIV', 'avatar-container')
		let avatar = newElement('IMG', 'avatar')
		avatar.src = src
		avatar.setAttribute('style', 'background: #bdc3c7')
		avatarContainer.append(avatar)
	
		let infoContainer = newElement('DIV', 'info-container')
		let _name = newElement('P', 'name', name)
		let _quote = newElement('Q', 'quote', quote)
		infoContainer.append(_name)
		infoContainer.append(_quote)
	
		let toolbarContainer = newElement('DIV', 'toolbar')
		let _user = newElement('DIV', 'user-container')
		let _mes = newElement('DIV', 'mes-container')
		let _req = newElement('DIV', 'req-container')
		
		let usericon = newElement('I', 'far fa-user-circle')
		let mesicon = newElement('I', 'far fa-comment-dots')
		if (!chat.loaded) {
			mesicon.style.color = 'rgba(255, 255, 255, 0.5)';
			chat.ready.push(() => mesicon.style.color = 'white');
		}
		let reqicon = newElement('I', 'far fa-paper-plane')
		$(reqicon).attr({
			'data-toggle': "tooltip",
			'data-placement': "top",
		})
		_user.append(usericon)
		_mes.append(mesicon)
		_req.append(reqicon)
		toolbarContainer.append(_user)
		toolbarContainer.append(_mes)
		toolbarContainer.append(_req)

		if (target.moreinfo.type == 'visitor' || user.moreinfo.type == 'guide') {
			reqicon.style.color = 'rgba(255, 255, 255, 0.5)';
			$(reqicon).attr('data-original-title', 'You cannot send request');
		}
		else $(reqicon).attr('data-original-title', 'send request');
		_req.onclick = () => {
			if (reqicon.style.color == 'rgba(255, 255, 255, 0.5)') return;
			reqicon.style.color = 'rgba(255, 255, 255, 0.5)';
			$(reqicon).attr('data-original-title', 'You cannot send request');
			sendingRequest({type: 'req', time: new Date(), receiver: target.uid})
		}
		_mes.onclick = () => {
		if (!chat.loaded) return;
			getRoom(target.uid, (roomId, msg) => {
			mesToChatContainer(roomId, msg, target)
		})
		}

		let modal = document.getElementById("myModal")
		let span = document.getElementsByClassName("close")[0]
		let targetProfile = modal.children[0].children[1]
		_user.onclick = () => {
			getInfo(target, targetProfile);
			modal.style.display = "block"
		}
		span.onclick = function() {
		modal.style.display = "none";
		}
		window.addEventListener('click', function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		})

		let card = newElement('DIV', 'card')
		card.append(avatarContainer)
		card.append(infoContainer)
		let _div = newElement('div');
		_div.setAttribute('cardid', target.uid);
		_div.append(card);
		_div.append(toolbarContainer);
		cardContainer.append(_div);
		console.log(_div)
	}
	
	incProBar();
	console.log('card.js loaded')
}
