
function void_double_scheme() {

	if ( gas('body').hasClass('dark-scheme') && gas('body').hasClass('light-scheme') ) {
		gas('body').removeClass('light-scheme');
	}
}

function ncc_scheme_switch(ele=false) {

	if (gas('body').hasClass('dark-scheme')) {
		gas('body').removeClass('dark-scheme');
		gas('body').addClass('light-scheme');
	} else {
		gas('body').removeClass('light-scheme');
		gas('body').addClass('dark-scheme');
	}
	
	construct_styles();

}	

function ncc_scheme_actived() {
	
	void_double_scheme();
		
	if (document.querySelector('#ncc_scheme_switch')) {
		
		//store selected scheme
		document.querySelector('#ncc_scheme_switch').addEventListener("click", function(e) {
			if (gas('body').hasClass('dark-scheme')) {
				localStorage.setItem('ncc-scheme','dark');
			} else {
				localStorage.setItem('ncc-scheme','light');
			}
		})
	}
}
	
function preferScheme() {

	if (typeof disable_scheme !== 'undefined') {
		
		if (disable_scheme) { 
			gas('body').addClass('light-scheme');
			localStorage.setItem('ncc-scheme','light')
			var scheme = 'light';
		}
	}

	
	var prefer_scheme = localStorage.getItem('ncc-scheme');

	void_double_scheme();

    if (!prefer_scheme) {

	    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		    var scheme = 'dark';
		    gas('body').addClass('dark-scheme');
	    } else {
		    var scheme = 'light';
		    gas('body').addClass('light-scheme');
	    }

	} else {

        if (prefer_scheme == 'dark') {
			if (! gas('body').hasClass('light-scheme')) {
				gas('body').addClass('dark-scheme');
			}
        } else {

			if (! gas('body').hasClass('dark-scheme')) {
				gas('body').addClass('light-scheme');
			}
			
        }

	}

	return prefer_scheme;

}