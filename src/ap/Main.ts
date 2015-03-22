/// <reference path='../../lib/illa/_module.ts'/>
/// <reference path='../../lib/illa/Log.ts'/>

/// <reference path='../../lib/jQuery.d.ts'/>

module ap {
	export class Main {
		
		private static instance = new Main();
		
		constructor() {
			if (window.location.search !== '?nr') {
				this.detectLanguageAndRedirect();
			}
		}
		
		detectLanguageAndRedirect(): void {
			var language = '';
			try {
				language = navigator['languages']? navigator['languages'][0] : (navigator.language || navigator.userLanguage);
			} catch (e) {};
			language = (language + '').toLowerCase();
			if (!language) return;
			
			var languageArr = language.split(/[-_]/);
			
			if (jQuery('html').prop('lang') !== languageArr[0]) {
				switch (languageArr[0]) {
					case 'en':
						window.location.replace('./?nr');
						break;
					case 'hu':
						window.location.replace('./index-hu.html?nr');
						break;
				}
			}
		}
	}
}