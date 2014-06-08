define(
['../bower_components/sammy/lib/min/sammy-0.7.5.min', 'project'],
	function(Sammy, app) {
		Sammy(function() {
                
                this.get('#detail', function() {
                    app.showCreatePoint();
                });
                
                this.get("#listpoints", function() {
                    app.showListPoints();
                });

                this.get("#edit:Id", function() {
                    app.showEditPoint(this.params['Id']);
                });

                this.get('', function() {
                    app.showMain();
                });

            }).run();
	}
);