function deleteAdsForTiebaComments(){
	var findParentPost = (ele)=>{
		if(ele){
			for(var i = 0; i < ele.classList.length; i++){
				if(ele.classList[i] === 'l_post'){
					return ele;
				}
			}
			return findParentPost(ele.parentElement);
		}else{
			return null;
		}
	};

	var timer = setInterval(()=>{
		var collections = document.body.getElementsByClassName('label_text');
		for(var i = 0; i < collections.length; i++){
			if(collections[i].innerHTML.match(/^.*广告.*$/)){
				var ele = findParentPost(collections[i]);
				if(ele){
					ele.remove();
					chrome.runtime.sendMessage('REMOVED_AN_ADD');
				}
			}
		}
	}, 500);
}

function deleteAdsForTiebaPosts(){
	var findParentPost = (ele)=>{
		if(ele){
			if(ele.tagName === 'LI'){
				return ele;
			}
			return findParentPost(ele.parentElement);
		}else{
			return null;
		}
	};

	var timer = setInterval(()=>{
		var collections = document.body.getElementsByClassName('label_text');
		for(var i = 0; i < collections.length; i++){
			if(collections[i].innerHTML.match(/^.*广告.*$/)){
				var ele = findParentPost(collections[i]);
				if(ele){
					ele.remove();
					chrome.runtime.sendMessage('REMOVED_AN_ADD');
				}
			}
		}
		var topAd = document.getElementById('pagelet_frs-header/pagelet/head_content_middle');
		if(topAd){
			topAd.style.display = 'none';
			chrome.runtime.sendMessage('REMOVED_AN_ADD');
		}
	}, 500);
}

if(window.location.href.match(/^.*tieba\.baidu\.com\/p\/\d+$/)){
	deleteAdsForTiebaComments();
}else if(window.location.href.match(/^.*tieba\.baidu\.com\/.*kw=.*$/)){
	deleteAdsForTiebaPosts();
}
