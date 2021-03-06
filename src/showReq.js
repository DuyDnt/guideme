function guideme_showReqList() {
	if (firstLoad) return
	reqListRef = db.ref('request/'+user.uid)
	// get full list of request
	reqListRef.once('value').then(snap => {
		// reqList[] = {type. time, target, comment, rate}
		reqList = snap.val()
		for (let k in reqList) {
			let req = reqList[k]
			let target = userList[req.target]
			db.ref('request/'+user.uid+'/'+k).update({isNew: 0})
			requestAction(target, {...req, key: k}, 0)
			if (req.type == 'req' || req.type == 'accepted') {
				$(`[cardid='${target.uid}']`).find('.fa-paper-plane').css('color', 'rgba(255, 255, 255, 0.5)').attr('data-original-title', 'This user is busy');
			}
			
		}
		reqListRef.orderByChild("isNew").startAt(1).on('child_added', snap => {
			// info
			let newReq = snap.val()
			let target = userList[newReq.target]
			// action
			requestAction(target, {...newReq, key: snap.key})
		})
		reqListRef.orderByChild("isNew").startAt(1).on('child_changed', snap => {
			// info
			let changedReq = snap.val()
			let target = userList[changedReq.target]
			// delete previous waiting request
			$(`[reqId='${changedReq.key}']`).fadeOut('fast', function() { this.remove(); });
			requestAction(target, {...changedReq, key: snap.key})
		})
	})
	// get added request
	incProBar()
}