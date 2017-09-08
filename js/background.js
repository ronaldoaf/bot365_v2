function includes_list(lista, padrao){
	var contem=false;
	$(lista).each(function(){
		if(this.includes(padrao) ) contem=true;		
	});
	return contem;
	
}





chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.command == "RELOAD") {
		chrome.tabs.query({},function(tabs){
			$(tabs).each(function(){		
				if (
					this.url.includes('151014714C1_1_3') || 
					this.url.includes('151017012C1_1_3') || 
					this.url.includes('MyBets') 
				) chrome.tabs.reload(this.id);
			});	
		});
	}
});






var bot_ligado;

$(document).ready(function(){
	
    tab_urls=[];
	
	//A cada 1 segundo verifica se as abas estão abetas
	setInterval(function(){		
		chrome.storage.sync.get('bot_ligado', function(obj) { 
			bot_ligado=obj.bot_ligado;
		});		
		if (bot_ligado){
			chrome.browserAction.setIcon({path: 'images/logo_32_verde.png'});
			tab_urls=[];
			chrome.tabs.query({},function(tabs){			
				$(tabs).each(function(){
					tab_urls.push(this.url);		
				});	
				if (!includes_list(tab_urls, '151014714C1_1_3') ) chrome.tabs.create({url:'https://mobile.365sport365.com/#type=Coupon;key=151014714C1_1_3;'});
				if (!includes_list(tab_urls, '151017012C1_1_3') ) chrome.tabs.create({url:'https://mobile.365sport365.com/#type=Coupon;key=151017012C1_1_3;'});
				if (!includes_list(tab_urls, 'MyBets') ) chrome.tabs.create({url:'https://mobile.365sport365.com/#type=MyBets;key=;ip=0;lng=1'});
				
			});		
		}
		else{
			chrome.browserAction.setIcon({path: 'images/logo_32.png'});		
		}
		
	},1000)
	
	console.log('atualizou');
	//A cada 30 minutos fecha as abas para a reabertura automatica
	setInterval(function(){
		console.log('entrou no setInterval');
		if (bot_ligado){
			chrome.tabs.query({},function(tabs){			
				$(tabs).each(function(){		
					if (
						this.url.includes('151014714C1_1_3') || 
						this.url.includes('151017012C1_1_3') || 
						this.url.includes('MyBets') 
					) chrome.tabs.remove(this.id);
				});	
				
			});		
		}		
		
	},30*60*1000);
	
	
	
});




