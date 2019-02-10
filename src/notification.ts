export function initNotification() {
	if (typeof(Notification) === 'undefined') {
		return;
	}
	Notification.requestPermission(function(status) {
		console.log('Notification permission status:', status);
	});
}

export function displayNotification(text) {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
            reg.showNotification(text);
        });
    }
}