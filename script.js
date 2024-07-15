(function (angular) {
	"use strict";
	
	let app = angular.module("myApp", []);
	
	app.controller("myCtrl", function ($scope, $http) {
		$scope.characters = [];
		$http.get("character_list.json")
			.then(function (response) {
				$scope.characters = response.data.map(char => {
					const rndId = Math.floor(Math.random() * char.images.length);
					char.selectedImage = char.images[rndId];
					return char;
				});
			})
			.catch(function (error) { console.error("Error loading character_list.json: ", error); });
		
		$scope.getIncludedCount = function () { return $scope.characters.filter(char => char.include).length; };
		
		$scope.getIncludedNames = function () { return $scope.characters.filter(char => char.include).map(char => char.name); };
		
		$scope.getIncluded = function () { return $scope.characters.filter(char => char.include); };
		
		$scope.toggleInclude = function (char) { char.include = !char.include; };

		$scope.selectAll = function () { $scope.characters.forEach(char => char.include = true); };

		$scope.deselectAll = function () { $scope.characters.forEach(char => char.include = false); };

		$scope.switchTraveler = function () {
			let traveler = $scope.characters[0];
			if (traveler.images[0].includes("aether")) {
				traveler.images = [
					"images/traveler/lumine01.png",
					"images/traveler/lumine02.png",
					"images/traveler/lumine03.png",
					"images/traveler/lumine04.png",
					"images/traveler/lumine05.png"
				];
				let rndId = Math.floor(Math.random() * traveler.images.length);
				traveler.selectedImage = traveler.images[rndId];
			}
			else {
				traveler.images = [
					"images/traveler/aether01.png",
					"images/traveler/aether02.png",
					"images/traveler/aether03.png",
					"images/traveler/aether04.png",
					"images/traveler/aether05.png",
					"images/traveler/aether06.png",
					"images/traveler/aether07.png",
					"images/traveler/aether08.png",
					"images/traveler/aether09.png",
					"images/traveler/aether10.png",
					"images/traveler/aether11.png",
					"images/traveler/aether12.png",
					"images/traveler/aether13.png",
					"images/traveler/aether14.png",
					"images/traveler/aether15.png",
					"images/traveler/aether16.png",
					"images/traveler/aether17.png"
				];
				let rndId = Math.floor(Math.random() * traveler.images.length);
				traveler.selectedImage = traveler.images[rndId];
			}
		};

		$scope.getRandomCharacter = function () {
			const chars = $scope.getIncluded();
			let charCount = $scope.getIncludedCount();
			let rndId = Math.floor(Math.random() * charCount);
			let rndChar = chars[rndId];
			return rndChar;
		};

		$scope.getRandomTeam = function () {
			const team = [];
			while (team.length < 4) {
				let char = $scope.getRandomCharacter();
				if (!team.includes(char)) { team.push(char); }
			}
			return team;
		};

		$scope.getTwoRandomTeams = function () {
			const team1 = $scope.getRandomTeam();
			const team2 = [];
			const teams = [team1, team2];
			while (team2.length < 4) {
				let char = $scope.getRandomCharacter();
				let alreadyInTeam = team1.includes(char) || team2.includes(char)
				if (!alreadyInTeam) { team2.push(char); }
			}
			return teams;
		};

		$scope.getRandom = function (option) {
			if (option == "one_char") { return $scope.getRandomCharacter(); }
			else if (option == "one_team") { return $scope.getRandomTeam(); }
			else if (option == "two_teams") { return $scope.getTwoRandomTeams(); }
			else { return "???"; }
		};
		
		$scope.showChar = false;
		$scope.lessThan1 = false;
		$scope.showTeam = false;
		$scope.lessThan4 = false;
		$scope.showTwoTeams = false;
		$scope.lessThan8 = false;

		function initSingleCharacterTooltip() {
			let element = document.querySelector("#single-character img");
			if (element) {
				element.setAttribute("data-bs-toggle", "tooltip");
				element.setAttribute("data-bs-title", element.getAttribute("tooltip"));
				element.setAttribute("title", "");
				new bootstrap.Tooltip(element);
			}
		}
		
		$scope.displayChar = function () {
			let enoughChars = $scope.getIncludedCount() >= 1;
			if (enoughChars) {
				$scope.rndChar = $scope.getRandom("one_char");
				$scope.showChar = true;
				$scope.lessThan1 = false;
				setTimeout(initSingleCharacterTooltip, 0);
			}
			else {
				$scope.showChar = false;
				$scope.lessThan1 = true;
			}
		};

		$scope.displayTeam = function () {
			let enoughChars = $scope.getIncludedCount() >= 4;
			if (enoughChars) {
				$scope.rndTeam = $scope.getRandom("one_team");
				$scope.showTeam = true;
				$scope.lessThan4 = false;
			}
			else {
				$scope.showTeam = false;
				$scope.lessThan4 = true;
			}
		};

		$scope.displayTwoTeams = function () {
			let enoughChars = $scope.getIncludedCount() >= 8;
			if (enoughChars) {
				$scope.rndTwoTeams = $scope.getRandom("two_teams");
				$scope.showTwoTeams = true;
				$scope.lessThan8 = false;
			}
			else {
				$scope.showTwoTeams = false;
				$scope.lessThan8 = true;
			}
		};
	});
	
	app.directive("selectedCharacterCount", function () {
		return {
			restrict: "A",
			template: "Number of Selected Characters: {{getIncludedCount()}}"
		};
	});
	
	app.directive("selectedCharacters", function () {
		return {
			restrict: "A",
			template: "Selected Characters: {{getIncludedNames().toString()}}"
		};
	});

	app.directive("disclaimer", function () {
		return {
			restrict: "A",
			template: "Disclaimer: This website is under construction. Nothing you see is final. Changes will be made, and new features added over time."
		};
	});

	app.directive("notEnoughCharacters1", function () {
		return {
			restrict: "A",
			template: "You must select at least 1 character."
		};
	});

	app.directive("notEnoughCharacters4", function () {
		return {
			restrict: "A",
			template: "You must select at least 4 characters."
		};
	});

	app.directive("notEnoughCharacters8", function () {
		return {
			restrict: "A",
			template: "You must select at least 8 characters."
		};
	});

	app.directive("tooltip", function () {
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				/*element.attr("data-bs-toggle", "tooltip");
				element.attr("data-bs-title", attrs.tooltip);*/
				element.attr("title", attrs.tooltip);
				// Initialize the tooltip
				new bootstrap.Tooltip(element[0]);
				// Watch for changes and reinitialize the tooltip
				/*attrs.$observe("tooltip", function (value) {
					element.attr("data-bs-title", value).tooltip("dispose").tooltip({ title: value });
				});*/
			}
		};
	});
})(window.angular);