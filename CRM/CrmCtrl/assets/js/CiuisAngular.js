var CiuisCRM = angular.module('Ciuis', ['Ciuis.datepicker', 'ngMaterial', 'ngMaterialDatePicker', 'currencyFormat', 'ciuisscheduler'])
	.config(function ($mdGestureProvider) {
		"use strict";
		$mdGestureProvider.skipClickHijack();
	});

function Ciuis_Controller($scope, $http, $mdSidenav, $filter, $interval) {
	"use strict";

	$scope.date = new Date();
	$scope.tick = function () {
		$scope.clock = Date.now();
	};
	$scope.tick();
	$interval($scope.tick, 1000);
	var curDate = new Date();
	var y = curDate.getFullYear();
	var m = curDate.getMonth() + 1;
	if (m < 10) {
		m = '0' + m;
	}
	var d = curDate.getDate();
	if (d < 10) {
		d = '0' + d;
	}
	$scope.curDate = y + '-' + m + '-' + d;
	$scope.appurl = BASE_URL;
	$scope.UPIMGURL = UPIMGURL;
	$scope.IMAGESURL = BASE_URL + 'assets/img/';
	$scope.SETFILEURL = BASE_URL + 'uploads/ciuis_settings/';
	$scope.ONLYADMIN = SHOW_ONLY_ADMIN;
	$scope.USERNAMEIN = LOGGEDINSTAFFNAME;
	$scope.USERAVATAR = LOGGEDINSTAFFAVATAR;
	$scope.activestaff = ACTIVESTAFF;
	$scope.cur_symbol = CURRENCY;
	$scope.cur_code = CURRENCY;
	$scope.cur_lct = LOCATE_SELECTED;

	$http.get(BASE_URL + 'api/settings').then(function (Settings) {
		$scope.settings = Settings.data;
		var setapp = $scope.settings;
		$scope.applogo = (setapp.logo);
	});

	$http.get(BASE_URL + 'api/leftmenu').then(function (LeftMenu) {
		$scope.all_menu_item = LeftMenu.data;
		$scope.menu = $filter('filter')($scope.all_menu_item, {
			show: 'true',
			show_staff: '0',
		});
	});

	$http.get(BASE_URL + 'api/stats').then(function (Stats) {
		$scope.stats = Stats.data;
	});

	$http.get(BASE_URL + 'api/menu').then(function (Navbar) {
		$scope.navbar = Navbar.data;
	});

	$http.get(BASE_URL + 'api/user').then(function (Userman) {
		$scope.user = Userman.data;

		if ($scope.user.appointment_availability === '1') {
			$scope.appointment_availability = true;
		} else {
			$scope.appointment_availability = false;
		}

		$http.get(BASE_URL + 'api/lang/' + $scope.user.language).then(function (Language) {
			$scope.lang = Language.data;
		});

		$scope.ChangeAppointmentAvailability = function (id, value) {
			$http.post(BASE_URL + 'staff/appointment_availability/' + id + '/' + value)
				.then(
					function (response) {
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$scope.ChangeLanguage = function (lang) {
		$http.get(BASE_URL + 'api/lang/' + lang).then(function (Language) {
			$scope.lang = Language.data;
		});
	};

	$http.get(BASE_URL + 'api/projects').then(function (Projects) {
		$scope.projects = Projects.data;
	});

	$http.get(BASE_URL + 'api/staff').then(function (Staff) {
		$scope.staff = Staff.data;
	});

	$http.get(BASE_URL + 'api/events').then(function (Events) {
		$scope.events = Events.data;
	});

	$http.get(BASE_URL + 'api/appointments').then(function (appointments) {
		$scope.dashboard_appointments = appointments.data;
	});

	$http.get(BASE_URL + 'api/meetings').then(function (Meetings) {
		$scope.meetings = Meetings.data;
	});

	$http.get(BASE_URL + 'api/transactions').then(function (Transactions) {
		$scope.transactions = Transactions.data;
	});

	$http.get(BASE_URL + 'api/dueinvoices').then(function (Dueinvoices) {
		$scope.dueinvoices = Dueinvoices.data;
	});

	$http.get(BASE_URL + 'api/overdueinvoices').then(function (Overdueinvoices) {
		$scope.overdueinvoices = Overdueinvoices.data;
	});

	$http.get(BASE_URL + 'api/newtickets').then(function (Newtickets) {
		$scope.newtickets = Newtickets.data;
	});

	$http.get(BASE_URL + 'api/notifications').then(function (Notifications) {
		$scope.notifications = Notifications.data;
	});

	$http.get(BASE_URL + 'api/logs').then(function (Logs) {
		$scope.logs = Logs.data;
	});

	$http.get(BASE_URL + 'api/todos').then(function (Todos) {
		$scope.todos = Todos.data;
	});

	$http.get(BASE_URL + 'api/donetodos').then(function (Donetodos) {
		$scope.tododone = Donetodos.data;
	});

	$http.get(BASE_URL + 'api/reminders').then(function (Reminders) {
		$scope.reminders = Reminders.data;
	});

	$http.get(BASE_URL + 'api/countries').then(function (Countries) {
		$scope.countries = Countries.data;
	});

	$http.get(BASE_URL + 'api/customers').then(function (Customers) {
		$scope.all_customers = Customers.data;
	});

	$http.get(BASE_URL + 'api/contacts').then(function (Contacts) {
		$scope.all_contacts = Contacts.data;
	});

	$http.get(BASE_URL + 'api/departments').then(function (Departments) {
		$scope.departments = Departments.data;
	});

	$scope.OpenMenu = function () {
		$('#mobile-menu').show();
	};

	$scope.EventForm = buildToggler('EventForm');
	$scope.SetOnsiteVisit = buildToggler('SetOnsiteVisit');
	$scope.Notifications = buildToggler('Notifications');
	$scope.Todo = buildToggler('Todo');
	$scope.Profile = buildToggler('Profile');
	$scope.PickUpTo = buildToggler('PickUpTo');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}

	$scope.close = function () {
		$mdSidenav('EventForm').close();
		$mdSidenav('SetOnsiteVisit').close();
		$mdSidenav('Notifications').close();
		$mdSidenav('Todo').close();
		$mdSidenav('Profile').close();
		$mdSidenav('PickUpTo').close();
		$('#mobile-menu').hide();
	};

	$scope.AddEvent = function () {
		var dataObj = $.param({
			title: $scope.event_title,
			public: $scope.event_public,
			detail: $scope.event_detail,
			eventstart: moment($scope.event_start).format("YYYY-MM-DD HH:mm:ss"),
			eventend: moment($scope.event_end).format("YYYY-MM-DD HH:mm:ss"),
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'calendar/addevent';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					$mdSidenav('EventForm').close();
					$.gritter.add({
						title: '<b>' + $scope.lang.notification + '</b>',
						text: $scope.lang.eventadded,
						position: 'bottom',
						class_name: 'color success',
					});
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.AddOnsiteVisit = function () {
		var dataObj = $.param({
			title: $scope.onsite_visit.title,
			customer_id: $scope.onsite_visit.customer_id,
			staff_id: $scope.onsite_visit.staff_id,
			description: $scope.onsite_visit.description,
			date: moment($scope.onsite_visit.start).format("YYYY-MM-DD"),
			start: moment($scope.onsite_visit.start).format("HH:mm:ss"),
			end: moment($scope.onsite_visit.end).format("HH:mm:ss"),
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'trivia/set_onsite_visit';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					$mdSidenav('SetOnsiteVisit').close();
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: response.data,
						position: 'bottom',
						class_name: 'color success',
					});
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.AddTodo = function () {
		var dataObj = $.param({
			tododetail: $scope.tododetail,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'trivia/addtodo';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					$scope.todos.push({
						'description': $scope.tododetail,
						'date': 'Right Now',
					});
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: $scope.lang.todoadded,
						position: 'bottom',
						class_name: 'color success',
					});
					$('input[type="text"],textarea').val('');
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.DeleteTodo = function (index) {
		var todo = $scope.todos[index];
		var dataObj = $.param({
			todo: todo.id
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'trivia/removetodo';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					$scope.todos.splice($scope.todos.indexOf(todo), 1);
					console.log(response);
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.TodoAsUnDone = function (index) {
		var todo = $scope.tododone[index];
		var dataObj = $.param({
			todo: todo.id
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		$http.post(BASE_URL + 'trivia/undonetodo', dataObj, config)
			.then(
				function (response) {
					var todo = $scope.tododone[index];
					$scope.tododone.splice($scope.tododone.indexOf(todo), 1);
					$scope.todos.unshift(todo);
					console.log(response);
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.TodoAsDone = function (index) {
		var todo = $scope.todos[index];
		var dataObj = $.param({
			todo: todo.id
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		$http.post(BASE_URL + 'trivia/donetodo', dataObj, config)
			.then(
				function (response) {
					var todo = $scope.todos[index];
					$scope.todos.splice($scope.todos.indexOf(todo), 1);
					$scope.tododone.unshift(todo);
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: $scope.lang.tododone,
						position: 'bottom',
						class_name: 'color success',
					});
					console.log(response);
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.ReminderRead = function (index) {
		var reminder = $scope.reminders[index];
		var dataObj = $.param({
			reminder_id: reminder.id
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'trivia/markreadreminder';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					$scope.reminders.splice($scope.reminders.indexOf(reminder), 1);
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: $scope.lang.remindermarkasread,
						class_name: 'color success'
					});
					console.log(response);
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.InvoiceCancel = function (e) {
		var id = $(e.target).data('invoice');
		var dataObj = $.param({
			status_id: 4,
			invoice_id: id,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'invoices/cancelled';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: INVMARKCACELLED,
						class_name: 'color danger'
					});
					$('.toggle-due').hide();
					$('.toggle-cash').hide();
					$('.cancelledinvoicealert').show();
					console.log(response);
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.NotificationRead = function (index) {
		var notification = $scope.notifications[index];
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'trivia/mark_read_notification/' + notification.id;
		$http.post(posturl, config)
			.then(
				function (response) {
					console.log(response);
					window.location.href = notification.target;
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.ChangeTicketStatus = function () {
		var dataObj = $.param({
			statusid: $scope.item.code,
			ticketid: $(".tickid").val(),
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		$http.post(BASE_URL + 'tickets/chancestatus', dataObj, config)
			.then(
				function (response) {
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: TICKSTATUSCHANGE,
						class_name: 'color success'
					});
					$(".label-status").text($scope.item.name);
					console.log(response);
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.ciuisTooltip = {
		showTooltip: false,
		tipDirection: 'bottom'
	};

	$scope.ciuisTooltip.delayTooltip = undefined;

	$scope.$watch('demo.delayTooltip', function (val) {
		$scope.ciuisTooltip.delayTooltip = parseInt(val, 10) || 0;
	});

	$scope.passwordLength = 12;
	$scope.addUpper = true;
	$scope.addNumbers = true;
	$scope.addSymbols = true;

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	$scope.createPassword = function () {
		var lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		var symbols = ['!', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
		var noOfLowerCharacters = 0,
			noOfUpperCharacters = 0,
			noOfNumbers = 0,
			noOfSymbols = 0;
		var noOfneededTypes = $scope.addUpper + $scope.addNumbers + $scope.addSymbols;
		var noOfLowerCharacters = getRandomInt(1, $scope.passwordLength - noOfneededTypes);
		var usedTypeCounter = 1;
		if ($scope.addUpper) {
			noOfUpperCharacters = getRandomInt(1, $scope.passwordLength - noOfneededTypes + usedTypeCounter - noOfLowerCharacters);
			usedTypeCounter++;
		}
		if ($scope.addNumbers) {
			noOfNumbers = getRandomInt(1, $scope.passwordLength - noOfneededTypes + usedTypeCounter - noOfLowerCharacters - noOfUpperCharacters);
			usedTypeCounter++;
		}
		if ($scope.addSymbols) {
			noOfSymbols = $scope.passwordLength - noOfLowerCharacters - noOfUpperCharacters - noOfNumbers;
		}
		var passwordArray = [];
		for (var i = 0; i < noOfLowerCharacters; i++) {
			passwordArray.push(lowerCharacters[getRandomInt(1, lowerCharacters.length - 1)]);
		}
		for (var i = 0; i < noOfUpperCharacters; i++) {
			passwordArray.push(upperCharacters[getRandomInt(1, upperCharacters.length - 1)]);
		}
		for (var i = 0; i < noOfNumbers; i++) {
			passwordArray.push(numbers[getRandomInt(1, numbers.length - 1)]);
		}
		for (var i = 0; i < noOfSymbols; i++) {
			passwordArray.push(symbols[getRandomInt(1, symbols.length - 1)]);
		}
		passwordArray = shuffleArray(passwordArray);
		return passwordArray.join("");
	};

	$scope.passwordNew = $scope.createPassword();

	$scope.getNewPass = function () {
		$scope.passwordNew = $scope.createPassword();
	};
}

function Leads_Controller($scope, $http, $mdSidenav, $mdDialog, $mdConstant, $filter) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_by_type/' + 'lead').then(function (custom_fields) {
		$scope.all_custom_fields = custom_fields.data;
		$scope.custom_fields = $filter('filter')($scope.all_custom_fields, {
			active: 'true',
		});
	});

	$scope.toggleFilter = buildToggler('ContentFilter');
	$scope.LeadSettings = buildToggler('LeadsSettings');
	$scope.Create = buildToggler('Create');
	$scope.Import = buildToggler('Import');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();
		};
	}

	$scope.close = function () {
		$mdSidenav('ContentFilter').close();
		$mdSidenav('LeadsSettings').close();
		$mdSidenav('Create').close();
		$mdSidenav('Import').close();
		$mdDialog.hide();
	};

	$scope.ConvertedStatus = function (ev) {
		$mdDialog.show({
			templateUrl: 'converted-status-template.html',
			scope: $scope,
			preserveScope: true,
			targetEvent: ev
		});
	};

	$scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
	$scope.tags = [];
	var semicolon = 186;
	$scope.customKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, semicolon];

	$http.get(BASE_URL + 'api/settings_detail').then(function (Settings) {
		$scope.settings_detail = Settings.data;

		$scope.ConvertedLeadStatus = $scope.settings_detail.converted_lead_status_id;
		$scope.MakeConvertedLedStatus = function () {
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'leads/make_converted_status/' + $scope.ConvertedLeadStatus, config)
				.then(
					function (response) {
						console.log(response);
						$mdDialog.hide();
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.RemoveConverted = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title(MSG_TITLE)
				.textContent(MSG_REMOVE)
				.ariaLabel('Delete Converted Leads')
				.targetEvent($scope.ConvertedLeadStatus)
				.ok(MSG_OK)
				.cancel(MSG_CANCEL);

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'leads/remove_converted/' + $scope.ConvertedLeadStatus, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'leads';
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};
	});

	$http.get(BASE_URL + 'api/leads_by_leadsource_leadpage').then(function (LeadsBySource) {
		new Chart($('#leads_by_leadsource'), {
			type: 'horizontalBar',
			data: LeadsBySource.data,
			options: {
				legend: {
					display: false,
				}
			}
		});
	});

	$http.get(BASE_URL + 'api/leads').then(function (Leads) {
		$scope.leads = Leads.data;
		$scope.GoLeadDetail = function (index) {
			var lead = $scope.leads[index];
			window.location.href = BASE_URL + 'leads/lead/' + lead.id;
		};
		$scope.itemsPerPage = 5;
		$scope.currentPage = 0;
		$scope.range = function () {
			var rangeSize = 5;
			var ps = [];
			var start;

			start = $scope.currentPage;
			//  console.log($scope.pageCount(),$scope.currentPage)
			if (start > $scope.pageCount() - rangeSize) {
				start = $scope.pageCount() - rangeSize + 1;
			}

			for (var i = start; i < start + rangeSize; i++) {
				if (i >= 0) {
					ps.push(i);
				}
			}
			return ps;
		};

		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.DisablePrevPage = function () {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
		};

		$scope.DisableNextPage = function () {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};

		$scope.setPage = function (n) {
			$scope.currentPage = n;
		};

		$scope.pageCount = function () {
			return Math.ceil($scope.leads.length / $scope.itemsPerPage) - 1;
		};
	});

	$scope.ShowKanban = function () {
		$scope.KanbanBoard = true;
	};

	$scope.HideKanban = function () {
		$scope.KanbanBoard = false;
	};

	$scope.dropSuccessHandler = function ($event, index, array) {
		$scope.selected_lead = $scope.leads[index];
		$scope.leads.splice($scope.leads.indexOf($scope.selected_lead), 1);
	};

	$scope.onDrop = function ($event, $data, array) {
		$scope.moved_lead = $data;
		var dataObj = $.param({
			lead_id: $scope.moved_lead.id,
			status_id: array,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		$http.post(BASE_URL + 'leads/move_lead/', dataObj, config)
			.then(
				function (response) {
					$http.get(BASE_URL + 'api/leads').then(function (Leads) {
						$scope.leads = Leads.data;
					});
				},
				function () {}
			);
	};

	$scope.AddLead = function () {
		$scope.tempArr = [];
		angular.forEach($scope.custom_fields, function (value) {
			if (value.type === 'input') {
				$scope.field_data = value.data;
			}
			if (value.type === 'textarea') {
				$scope.field_data = value.data;
			}
			if (value.type === 'date') {
				$scope.field_data = moment(value.data).format("YYYY-MM-DD");
			}
			if (value.type === 'select') {
				$scope.field_data = JSON.stringify(value.selected_opt);
			}
			$scope.tempArr.push({
				id: value.id,
				name: value.name,
				type: value.type,
				order: value.order,
				data: $scope.field_data,
				relation: value.relation,
				permission: value.permission,
				active: value.active,
			});
		});
		if ($scope.lead.public === true) {
			$scope.isPublic = 1;
		} else {
			$scope.isPublic = 0;
		}
		if ($scope.lead.type === true) {
			$scope.isIndividual = 1;
		} else {
			$scope.isIndividual = 0;
		}
		var dataObj = $.param({
			title: $scope.lead.title,
			date_contacted: moment($scope.lead.date_contacted).format("YYYY-MM-DD HH:mm:ss"),
			name: $scope.lead.name,
			company: $scope.lead.company,
			assigned: $scope.lead.assigned_id,
			status: $scope.lead.status_id,
			source: $scope.lead.source_id,
			phone: $scope.lead.phone,
			email: $scope.lead.email,
			website: $scope.lead.website,
			country_id: $scope.lead.country_id,
			state: $scope.lead.state,
			city: $scope.lead.city,
			zip: $scope.lead.zip,
			address: $scope.lead.address,
			description: $scope.lead.description,
			public: $scope.isPublic,
			type: $scope.isIndividual,
			tags: JSON.stringify($scope.tags),
			custom_fields: $scope.tempArr,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'leads/create/';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					window.location.href = BASE_URL + 'leads/lead/' + response.data;
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.filter = {};
	$scope.getOptionsFor = function (propName) {
		return ($scope.leads || []).map(function (item) {
			return item[propName];
		}).filter(function (item, idx, arr) {
			return arr.indexOf(item) === idx;
		}).sort();
	};
	$scope.FilteredData = function (item) {
		// Use this snippet for matching with AND
		var matchesAND = true;
		for (var prop in $scope.filter) {
			if (noSubFilter($scope.filter[prop])) {
				continue;
			}
			if (!$scope.filter[prop][item[prop]]) {
				matchesAND = false;
				break;
			}
		}
		return matchesAND;
	};

	function noSubFilter(subFilterObj) {
		for (var key in subFilterObj) {
			if (subFilterObj[key]) {
				return false;
			}
		}
		return true;
	}
	// Filtered Datas
	$scope.search = {
		name: '',
		statusname: ''
	};

	$http.get(BASE_URL + 'api/leadstatuses').then(function (LeadStatuses) {
		$scope.leadstatuses = LeadStatuses.data;
		$scope.NewStatus = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.prompt()
				.title('New Status')
				.textContent('Please type status name')
				.placeholder('Status Name')
				.ariaLabel('Status Name')
				.initialValue('')
				.required(true)
				.ok('Add!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function (result) {
				var dataObj = $.param({
					name: result,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'leads/add_status/', dataObj, config)
					.then(
						function (response) {
							console.log(response);
							$scope.leadstatuses.push({
								'id': response.data,
								'name': result,
							});
						},
						function (response) {
							console.log(response);
						}
					);
			}, function () {

			});
		};
		$scope.EditStatus = function (status_id, lead_status, event) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.prompt()
				.title('Edit Lead Status')
				.textContent('You can change lead status name.')
				.placeholder('Status name')
				.ariaLabel('Status Name')
				.initialValue(lead_status)
				.targetEvent(event)
				.required(true)
				.ok('Save')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function (result) {
				var dataObj = $.param({
					name: result,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'leads/update_status/' + status_id, dataObj, config)
					.then(
						function () {
							//Success
						},
						function () {
							//UNSUCCESS
						}
					);
			}, function () {
				//Cancel
			});
		};
		$scope.DeleteLeadStatus = function (index) {
			var status = $scope.leadstatuses[index];
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'leads/remove_status/' + status.id, config)
				.then(
					function (response) {
						$scope.leadstatuses.splice($scope.leadstatuses.indexOf(status), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$http.get(BASE_URL + 'api/leadsources').then(function (LeadSources) {
		$scope.leadssources = LeadSources.data;
		$scope.NewSource = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.prompt()
				.title('New Source')
				.textContent('Please type source name')
				.placeholder('Source Name')
				.ariaLabel('Source Name')
				.initialValue('')
				.required(true)
				.ok('Add!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function (result) {
				var dataObj = $.param({
					name: result,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'leads/add_source/', dataObj, config)
					.then(
						function (response) {
							console.log(response);
							$scope.leadssources.push({
								'id': response.data,
								'name': result,
							});
						},
						function (response) {
							console.log(response);
						}
					);
			}, function () {

			});
		};
		$scope.EditSource = function (source_id, lead_source, event) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.prompt()
				.title('Edit Lead Source')
				.textContent('You can change lead source name.')
				.placeholder('Status name')
				.ariaLabel('Status Name')
				.initialValue(lead_source)
				.targetEvent(event)
				.required(true)
				.ok('Save')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function (result) {
				var dataObj = $.param({
					name: result,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'leads/update_source/' + source_id, dataObj, config)
					.then(
						function () {
							//Success
						},
						function () {
							//UNSUCCESS
						}
					);
			}, function () {
				//Cancel
			});
		};
		$scope.DeleteLeadSource = function (index) {
			var source = $scope.leadssources[index];
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'leads/remove_source/' + source.id, config)
				.then(
					function (response) {
						$scope.leadssources.splice($scope.leadssources.indexOf(source), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});
}

function Lead_Controller($scope, $http, $mdSidenav, $mdDialog, $filter) {
	"use strict";

	$scope.ReminderForm = buildToggler('ReminderForm');
	$scope.Update = buildToggler('Update');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}
	$scope.close = function () {
		$mdSidenav('ReminderForm').close();
		$mdSidenav('Update').close();
	};

	$http.get(BASE_URL + 'api/custom_fields_data_by_type/' + 'lead/' + LEADID).then(function (custom_fields) {
		$scope.custom_fields = custom_fields.data;
	});

	$http.get(BASE_URL + 'api/lead/' + LEADID).then(function (Lead) {
		$scope.lead = Lead.data;

		$scope.MarkLeadAs = function (status) {
			if (status === 1) {
				$scope.lead.lost = 1;
				$scope.valuOn = 1;
				$scope.TypeOn = 'lost';
			}
			if (status === 2) {
				$scope.lead.lost = 0;
				$scope.valuOn = 2;
				$scope.TypeOn = 'lost';
			}
			if (status === 3) {
				$scope.lead.junk = 1;
				$scope.valuOn = 3;
				$scope.TypeOn = 'junk';
			}
			if (status === 4) {
				$scope.lead.junk = 0;
				$scope.valuOn = 4;
				$scope.TypeOn = 'junk';
			}
			var dataObj = $.param({
				value: $scope.valuOn,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'leads/mark_as_lead/' + LEADID, dataObj, config)
				.then(
					function (response) {
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.UpdateLead = function () {
			if ($scope.lead.public === true) {
				$scope.isPublic = 1;
			} else {
				$scope.isPublic = 0;
			}
			if ($scope.lead.type === true) {
				$scope.isIndividual = 1;
			} else {
				$scope.isIndividual = 0;
			}
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				title: $scope.lead.title,
				name: $scope.lead.name,
				company: $scope.lead.company,
				assigned_id: $scope.lead.assigned_id,
				status: $scope.lead.status_id,
				source: $scope.lead.source_id,
				phone: $scope.lead.phone,
				email: $scope.lead.email,
				website: $scope.lead.website,
				country_id: $scope.lead.country_id,
				state: $scope.lead.state,
				city: $scope.lead.city,
				zip: $scope.lead.zip,
				address: $scope.lead.address,
				description: $scope.lead.description,
				public: $scope.isPublic,
				type: $scope.isIndividual,
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'leads/update/' + LEADID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('Update').close();
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color success'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$http.get(BASE_URL + 'api/leadstatuses').then(function (LeadStatuses) {
		$scope.statuses = LeadStatuses.data;
	});

	$http.get(BASE_URL + 'api/leadsources').then(function (LeadSources) {
		$scope.sources = LeadSources.data;
	});

	$scope.Delete = function () {
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = $mdDialog.confirm()
			.title('Attention!')
			.textContent('Do you confirm the deletion of all data belonging to this lead?')
			.ariaLabel('Delete Customer')
			.targetEvent(LEADID)
			.ok('Do it!')
			.cancel('Cancel');

		$mdDialog.show(confirm).then(function () {
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'leads/remove/' + LEADID, config)
				.then(
					function (response) {
						console.log(response);
						window.location.href = BASE_URL + 'leads';
					},
					function (response) {
						console.log(response);
					}
				);

		}, function () {
			//
		});
	};

	$scope.Convert = function () {
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = $mdDialog.confirm()
			.title('Convert Lead to Customer!')
			.textContent('Do you want to convert lead into a customer?')
			.ariaLabel('Convert Lead')
			.targetEvent(LEADID)
			.ok('Convert!')
			.cancel('Cancel');

		$mdDialog.show(confirm).then(function () {
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'leads/convert/' + LEADID, config)
				.then(
					function (response) {
						console.log(response);
						if (response.data === false) {
							$.gritter.add({
								title: '<b>' + NTFTITLE + '</b>',
								text: 'Already converted!',
								class_name: 'color warning'
							});
						} else {
							window.location.href = BASE_URL + 'customers/customer/' + response.data;
						}
					}
				);

		}, function () {
			//
		});
	};

	$http.get(BASE_URL + 'api/reminders_by_type/lead/' + LEADID).then(function (Reminders) {
		$scope.in_reminders = Reminders.data;
		$scope.AddReminder = function () {
			var dataObj = $.param({
				description: $scope.reminder_description,
				date: moment($scope.reminder_date).format("YYYY-MM-DD HH:mm:ss"),
				staff: $scope.reminder_staff,
				relation_type: 'lead',
				relation: LEADID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/addreminder';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$scope.in_reminders.push({
							'description': $scope.reminder_description,
							'creator': LOGGEDINSTAFFNAME,
							'avatar': UPIMGURL + LOGGEDINSTAFFAVATAR,
							'staff': LOGGEDINSTAFFNAME,
							'date': $scope.reminder_date,
						});
						$mdSidenav('ReminderForm').close();
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.DeleteReminder = function (index) {
			var reminder = $scope.in_reminders[index];
			var dataObj = $.param({
				reminder: reminder.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/remove_reminder';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.in_reminders.splice($scope.in_reminders.indexOf(reminder), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$http.get(BASE_URL + 'api/notes/lead/' + LEADID).then(function (Notes) {
		$scope.notes = Notes.data;
		$scope.AddNote = function () {
			var dataObj = $.param({
				description: $scope.note,
				relation_type: 'lead',
				relation: LEADID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/addnote';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.notes.push({
							'description': $scope.note,
							'staff': LOGGEDINSTAFFNAME,
							'date': new Date(),
						});
						$('.note-description').val('');
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.DeleteNote = function (index) {
			var note = $scope.notes[index];
			var dataObj = $.param({
				notes: note.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/removenote';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.notes.splice($scope.notes.indexOf(note), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$http.get(BASE_URL + 'api/proposals').then(function (Proposals) {
		$scope.all_proposals = Proposals.data;
		$scope.proposals = $filter('filter')($scope.all_proposals, {
			relation_type: "lead",
			relation: LEADID
		});
	});
}

function Accounts_Controller($scope, $http, $mdSidenav) {
	"use strict";

	$scope.Create = buildToggler('Create');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}
	$scope.close = function () {
		$mdSidenav('Create').close();
	};

	$http.get(BASE_URL + 'api/accounts').then(function (Accounts) {
		$scope.accounts = Accounts.data;
		$scope.AddAccount = function () {
			if ($scope.isBankType === true) {
				$scope.isBank = 1;
			}
			if ($scope.isBankType === false) {
				$scope.isBank = 0;
			}
			var dataObj = $.param({
				name: $scope.account.name,
				bankname: $scope.account.bankname,
				branchbank: $scope.account.branchbank,
				account: $scope.account.account,
				iban: $scope.account.iban,
				type: $scope.isBank,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'accounts/create/';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('Create').close();
						$scope.accounts.push({
							'id': response.data.id,
							'name': response.data.name,
							'amount': response.data.amount,
							'icon': response.data.icon,
							'status': response.data.status,
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});
}

function Account_Controller($scope, $http, $mdSidenav, $mdDialog) {
	"use strict";

	$http.get(BASE_URL + 'api/accounts').then(function (Accounts) {
		$scope.accounts = Accounts.data;
	});

	$scope.QuickTransfer_ = false;

	$scope.QuickTransfer = function () {
		$scope.QuickTransfer_ = true;
	};

	$scope.CancelTransfer = function () {
		$scope.QuickTransfer_ = false;
	};

	$scope.Update = buildToggler('Update');

	$scope.Detail = function (id) {
		$mdDialog.show({
			contentElement: '#payment-' + id,
			parent: angular.element(document.body),
			targetEvent: id,
			clickOutsideToClose: true
		});
	};

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}

	$scope.close = function () {
		$mdSidenav('Update').close();
		$mdDialog.hide();
	};

	$http.get(BASE_URL + 'api/account/' + ACCOUNTID).then(function (Account) {
		$scope.account = Account.data;

		$scope.MakeTransfer = function () {
			var dataObj = $.param({
				from_account_id: $scope.account.id,
				to_account_id: $scope.To_Account_ID,
				amount: $scope.TransferAmount,
			});

			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'accounts/make_transfer';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('EventForm').close();
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: $scope.transfer_message,
							position: 'bottom',
							class_name: 'color success',
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.current_balance = $scope.account.account_total;

		if ($scope.account.status === true) {
			$scope.isActive = 0;
		} else {
			$scope.isActive = 1;
		}
		$scope.UpdateAccount = function () {
			var dataObj = $.param({
				name: $scope.account.name,
				bankname: $scope.account.bankname,
				branchbank: $scope.account.branchbank,
				account: $scope.account.account,
				iban: $scope.account.iban,
				status: $scope.isActive,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'accounts/update/' + ACCOUNTID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('Update').close();
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color success'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.Delete = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Attention!')
				.textContent('Do you confirm the deletion of all data belonging to this account?')
				.ariaLabel('Delete Account')
				.targetEvent(ACCOUNTID)
				.ok('Do it!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'accounts/remove/' + ACCOUNTID, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'accounts';
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};
	});
}

function Customers_Controller($scope, $http, $mdSidenav, $filter) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_by_type/' + 'customer').then(function (custom_fields) {
		$scope.all_custom_fields = custom_fields.data;
		$scope.custom_fields = $filter('filter')($scope.all_custom_fields, {
			active: 'true',
		});
	});

	$scope.toggleFilter = buildToggler('ContentFilter');
	$scope.Create = buildToggler('Create');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}
	$scope.close = function () {
		$mdSidenav('ContentFilter').close();
		$mdSidenav('Create').close();
	};

	$http.get(BASE_URL + 'api/customers').then(function (Customers) {
		$scope.customers = Customers.data;

		$scope.GoCustomer = function (index) {
			var customer = $scope.customers[index];
			window.location.href = BASE_URL + 'customers/customer/' + customer.id;
		};

		$scope.isIndividual = false;

		$scope.AddCustomer = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				company: $scope.customer.company,
				namesurname: $scope.customer.namesurname,
				taxoffice: $scope.customer.taxoffice,
				taxnumber: $scope.customer.taxnumber,
				ssn: $scope.customer.ssn,
				executive: $scope.customer.executive,
				address: $scope.customer.address,
				zipcode: $scope.customer.zipcode,
				country_id: $scope.customer.country_id,
				state: $scope.customer.state,
				city: $scope.customer.city,
				town: $scope.customer.town,
				phone: $scope.customer.phone,
				fax: $scope.customer.fax,
				email: $scope.customer.email,
				web: $scope.customer.web,
				risk: $scope.customer.risk,
				billing_street: $scope.customer.billing_street,
				billing_city: $scope.customer.billing_city,
				billing_state: $scope.customer.billing_state,
				billing_zip: $scope.customer.billing_zip,
				billing_country: $scope.customer.billing_country,
				shipping_street: $scope.customer.shipping_street,
				shipping_city: $scope.customer.shipping_city,
				shipping_state: $scope.customer.shipping_state,
				shipping_zip: $scope.customer.shipping_zip,
				shipping_country: $scope.customer.shipping_country,
				type: $scope.isIndividual,
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'customers/create/';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						window.location.href = BASE_URL + 'customers/customer/' + response.data;
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.SameAsCustomerAddress = function () {
			$scope.customer.billing_street = $scope.customer.address;
			$scope.customer.billing_city = $scope.customer.city;
			$scope.customer.billing_state = $scope.customer.state;
			$scope.customer.billing_zip = $scope.customer.zipcode;
			$scope.customer.billing_country = $scope.customer.country_id;
		};

		$scope.SameAsBillingAddress = function () {
			$scope.customer.shipping_street = $scope.customer.billing_street;
			$scope.customer.shipping_city = $scope.customer.billing_city;
			$scope.customer.shipping_state = $scope.customer.billing_state;
			$scope.customer.shipping_zip = $scope.customer.billing_zip;
			$scope.customer.shipping_country = $scope.customer.billing_country;
		};

		$scope.filter = {};
		$scope.getOptionsFor = function (propName) {
			return ($scope.customers || []).map(function (item) {
				return item[propName];
			}).filter(function (item, idx, arr) {
				return arr.indexOf(item) === idx;
			}).sort();
		};
		$scope.FilteredData = function (item) {
			// Use this snippet for matching with AND
			var matchesAND = true;
			for (var prop in $scope.filter) {
				if (noSubFilter($scope.filter[prop])) {
					continue;
				}
				if (!$scope.filter[prop][item[prop]]) {
					matchesAND = false;
					break;
				}
			}
			return matchesAND;

		};

		function noSubFilter(subFilterObj) {
			for (var key in subFilterObj) {
				if (subFilterObj[key]) {
					return false;
				}
			}
			return true;
		}
		$scope.updateDropdown = function (_prop) {
			var _opt = this.filter_select,
				_optList = this.getOptionsFor(_prop),
				len = _optList.length;

			if (_opt == 'all') {
				for (var j = 0; j < len; j++) {
					$scope.filter[_prop][_optList[j]] = true;
				}
			} else {
				for (var j = 0; j < len; j++) {
					$scope.filter[_prop][_optList[j]] = false;
				}
				$scope.filter[_prop][_opt] = true;
			}
		};
		// Filtered Datas
		$scope.search = {
			name: '',
		};
		$scope.itemsPerPage = 5;
		$scope.currentPage = 0;
		$scope.range = function () {
			var rangeSize = 5;
			var ps = [];
			var start;

			start = $scope.currentPage;
			//  console.log($scope.pageCount(),$scope.currentPage)
			if (start > $scope.pageCount() - rangeSize) {
				start = $scope.pageCount() - rangeSize + 1;
			}

			for (var i = start; i < start + rangeSize; i++) {
				if (i >= 0) {
					ps.push(i);
				}
			}
			return ps;
		};

		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.DisablePrevPage = function () {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
		};

		$scope.DisableNextPage = function () {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};

		$scope.setPage = function (n) {
			$scope.currentPage = n;
		};

		$scope.pageCount = function () {
			return Math.ceil($scope.customers.length / $scope.itemsPerPage) - 1;
		};
	});
}

function Customer_Controller($scope, $http, $filter, $mdSidenav, $mdDialog) {
	"use strict";

	$scope.ReminderForm = buildToggler('ReminderForm');
	$scope.NewContact = buildToggler('NewContact');
	$scope.Update = buildToggler('Update');
	$('.update-view').hide();

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}

	$scope.close = function () {
		$mdSidenav('ReminderForm').close();
		$mdSidenav('NewContact').close();
		$mdSidenav('Update').close();
	};

	$scope.SameAsCustomerAddress = function () {
		$scope.customer.billing_street = $scope.customer.address;
		$scope.customer.billing_city = $scope.customer.city;
		$scope.customer.billing_state = $scope.customer.state;
		$scope.customer.billing_zip = $scope.customer.zipcode;
		$scope.customer.billing_country = $scope.customer.country_id;
	};

	$scope.SameAsBillingAddress = function () {
		$scope.customer.shipping_street = $scope.customer.billing_street;
		$scope.customer.shipping_city = $scope.customer.billing_city;
		$scope.customer.shipping_state = $scope.customer.billing_state;
		$scope.customer.shipping_zip = $scope.customer.billing_zip;
		$scope.customer.shipping_country = $scope.customer.billing_country;
	};

	$http.get(BASE_URL + 'api/custom_fields_data_by_type/' + 'customer/' + CUSTOMERID).then(function (custom_fields) {
		$scope.custom_fields = custom_fields.data;
	});

	$http.get(BASE_URL + 'api/customer/' + CUSTOMERID).then(function (Customer) {
		$scope.customer = Customer.data;

		var canvas = document.getElementById("customer_annual_sales_chart");
		var multiply = {
			beforeDatasetsDraw: function (chart, options, el) {
				chart.ctx.globalCompositeOperation = 'multiply';
			},
			afterDatasetsDraw: function (chart, options) {
				chart.ctx.globalCompositeOperation = 'source-over';
			},
		};
		var gradientThisWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
		gradientThisWeek.addColorStop(0, '#ffbc00');
		gradientThisWeek.addColorStop(1, '#fff');
		var gradientPrevWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
		gradientPrevWeek.addColorStop(0, '#616f8c');
		gradientPrevWeek.addColorStop(1, '#fff');
		var config = {
			type: 'bar',
			data: $scope.customer.chart_data,
			options: {
				elements: {
					point: {
						radius: 0,
						hitRadius: 5,
						hoverRadius: 5
					}
				},
				legend: {
					display: false,
				},
				scales: {
					xAxes: [{
						display: false,
					}],
					yAxes: [{
						display: false,
						ticks: {
							beginAtZero: true,
						},
					}]
				},
				legend: {
					display: true
				}
			},
			plugins: [multiply],
		};
		window.chart = new Chart(canvas, config)

		$http.get(BASE_URL + 'api/invoices').then(function (Invoices) {
			$scope.all_invoices = Invoices.data;
			$scope.invoices = $filter('filter')($scope.all_invoices, {
				customer_id: CUSTOMERID,
			});
		});

		$scope.GoInvoice = function (index) {
			var invoice = $scope.invoices[index];
			window.location.href = BASE_URL + 'invoices/invoice/' + invoice.id;
		};

		$http.get(BASE_URL + 'api/proposals').then(function (Proposals) {
			$scope.all_proposals = Proposals.data;
			$scope.proposals = $filter('filter')($scope.all_proposals, {
				relation_type: 'customer',
				relation: CUSTOMERID,
			});
		});

		$scope.GoProposal = function (index) {
			var proposal = $scope.proposals[index];
			window.location.href = BASE_URL + 'proposals/proposal/' + proposal.id;
		};

		$http.get(BASE_URL + 'api/projects').then(function (Projects) {
			$scope.all_projects = Projects.data;
			$scope.projects = $filter('filter')($scope.all_projects, {
				customer_id: CUSTOMERID,
			});
		});

		$scope.GoProject = function (index) {
			var project = $scope.projects[index];
			window.location.href = BASE_URL + 'projects/project/' + project.id;
		};

		$http.get(BASE_URL + 'api/tickets').then(function (Tickets) {
			$scope.all_tickets = Tickets.data;
			$scope.tickets = $filter('filter')($scope.all_tickets, {
				customer_id: CUSTOMERID,
			});
		});

		$scope.GoTicket = function (index) {
			var ticket = $scope.tickets[index];
			window.location.href = BASE_URL + 'tickets/ticket/' + ticket.id;
		};

		$scope.UpdateCustomer = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				company: $scope.customer.company,
				namesurname: $scope.customer.namesurname,
				taxoffice: $scope.customer.taxoffice,
				taxnumber: $scope.customer.taxnumber,
				ssn: $scope.customer.ssn,
				executive: $scope.customer.executive,
				address: $scope.customer.address,
				zipcode: $scope.customer.zipcode,
				country_id: $scope.customer.country_id,
				state: $scope.customer.state,
				city: $scope.customer.city,
				town: $scope.customer.town,
				phone: $scope.customer.phone,
				fax: $scope.customer.fax,
				email: $scope.customer.email,
				web: $scope.customer.web,
				risk: $scope.customer.risk,
				billing_street: $scope.customer.billing_street,
				billing_city: $scope.customer.billing_city,
				billing_state: $scope.customer.billing_state,
				billing_zip: $scope.customer.billing_zip,
				billing_country: $scope.customer.billing_country,
				shipping_street: $scope.customer.shipping_street,
				shipping_city: $scope.customer.shipping_city,
				shipping_state: $scope.customer.shipping_state,
				shipping_zip: $scope.customer.shipping_zip,
				shipping_country: $scope.customer.shipping_country,
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'customers/customer/' + CUSTOMERID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('Update').close();
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color success'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.Delete = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Attention!')
				.textContent('Do you confirm the deletion of all data belonging to this customer?')
				.ariaLabel('Delete Customer')
				.targetEvent(CUSTOMERID)
				.ok('Do it!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'customers/remove/' + CUSTOMERID, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'customers';
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};


		$http.get(BASE_URL + 'api/contacts').then(function (contacts) {
			$scope.all_contacts = contacts.data;
			$scope.contacts = $filter('filter')($scope.all_contacts, {
				customer_id: CUSTOMERID,
			});
		});

		$scope.isPrimary = false;
		$scope.isAdmin = false;

		$scope.ContactDetail = function (index) {
			var contact = $scope.contacts[index];
			$mdDialog.show({
				contentElement: '#ContactModal-' + contact.id,
				parent: angular.element(document.body),
				targetEvent: index,
				clickOutsideToClose: true
			});
			$scope.UpdateContactPrivilege = function (id, value, privilege_id) {
				$http.post(BASE_URL + 'customers/update_contact_privilege/' + id + '/' + value + '/' + privilege_id)
					.then(
						function (response) {
							console.log(response);
						},
						function (response) {
							console.log(response);
						}
					);
			};
		};

		$scope.AddContact = function () {
			var dataObj = $.param({
				name: $scope.newcontact.name,
				surname: $scope.newcontact.surname,
				phone: $scope.newcontact.phone,
				extension: $scope.newcontact.extension,
				mobile: $scope.newcontact.mobile,
				email: $scope.newcontact.email,
				address: $scope.newcontact.address,
				skype: $scope.newcontact.skype,
				linkedin: $scope.newcontact.linkedin,
				position: $scope.newcontact.position,
				customer: CUSTOMERID,
				isPrimary: $scope.isPrimary,
				isAdmin: $scope.isAdmin,
				password: $scope.passwordNew,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'customers/create_contact/', dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$scope.contacts.push({
							'name': $scope.newcontact.name,
							'surname': $scope.newcontact.surname,
							'email': $scope.newcontact.email,
						});
						$mdSidenav('NewContact').close();
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color success'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.UpdateContact = function (index) {
			var contact = $scope.contacts[index];
			var contact_id = contact.id;
			$scope.contact = contact;
			var dataObj = $.param({
				name: $scope.contact.name,
				surname: $scope.contact.surname,
				phone: $scope.contact.phone,
				extension: $scope.contact.extension,
				mobile: $scope.contact.mobile,
				email: $scope.contact.email,
				address: $scope.contact.address,
				skype: $scope.contact.skype,
				linkedin: $scope.contact.linkedin,
				position: $scope.contact.position,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'customers/update_contact/' + contact_id;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$('#updatecontact' + contact_id + '').modal('hide');
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.ChangePassword = function (contact) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.prompt()
				.title('Change Password')
				.textContent('Are sure change contact password?')
				.placeholder('Password')
				.ariaLabel('Password')
				.initialValue('')
				.targetEvent(contact)
				.required(true)
				.ok('Okay!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function (result) {
				var dataObj = $.param({
					password: result,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'customers/change_password_contact/' + contact, dataObj, config)
					.then(
						function (response) {
							console.log(response);
							$.gritter.add({
								title: '<b>' + NTFTITLE + '</b>',
								text: response.data,
								class_name: 'color warning'
							});

						},
						function (response) {
							console.log(response);
						}
					);
			}, function () {

			});
		};

		$scope.RemoveContact = function (id) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Attention!')
				.textContent('Are you sure you want to delete this contact from contacts?')
				.ariaLabel('Delete Contact')
				.targetEvent(id)
				.ok('Please do it!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'customers/remove_contact/' + id, config)
					.then(
						function (response) {
							$.gritter.add({
								title: '<b>' + NTFTITLE + '</b>',
								text: response.data,
								class_name: 'color danger'
							});
							$scope.contacts.splice($scope.contacts.indexOf(id), 1);
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};

		$scope.CloseModal = function () {
			$mdDialog.cancel();
		};

	});

	$http.get(BASE_URL + 'api/reminders_by_type/customer/' + CUSTOMERID).then(function (Reminders) {
		$scope.in_reminders = Reminders.data;

		$scope.AddReminder = function () {
			var dataObj = $.param({
				description: $scope.reminder_description,
				date: moment($scope.reminder_date).format("YYYY-MM-DD HH:mm:ss"),
				staff: $scope.reminder_staff,
				relation_type: 'customer',
				relation: CUSTOMERID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/addreminder';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$scope.in_reminders.push({
							'description': $scope.reminder_description,
							'creator': LOGGEDINSTAFFNAME,
							'avatar': UPIMGURL + LOGGEDINSTAFFAVATAR,
							'staff': LOGGEDINSTAFFNAME,
							'date': $scope.reminder_date,
						});
						$mdSidenav('ReminderForm').close();
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$http.get(BASE_URL + 'api/notes/customer/' + CUSTOMERID).then(function (Notes) {
		$scope.notes = Notes.data;

		$scope.AddNote = function () {
			var dataObj = $.param({
				description: $scope.note,
				relation_type: 'customer',
				relation: CUSTOMERID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/addnote';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.notes.push({
							'description': $scope.note,
							'staff': LOGGEDINSTAFFNAME,
							'date': new Date(),
						});
						$('.note-description').val('');
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.DeleteNote = function (index) {
			var note = $scope.notes[index];
			var dataObj = $.param({
				notes: note.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/removenote';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.notes.splice($scope.notes.indexOf(note), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});
}

function Tasks_Controller($scope, $http, $mdSidenav, $filter) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_by_type/' + 'task').then(function (custom_fields) {
		$scope.all_custom_fields = custom_fields.data;
		$scope.custom_fields = $filter('filter')($scope.all_custom_fields, {
			active: 'true',
		});
	});

	$scope.toggleFilter = buildToggler('ContentFilter');
	$scope.Create = buildToggler('Create');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}
	$scope.close = function () {
		$mdSidenav('ContentFilter').close();
		$mdSidenav('Create').close();
	};

	$http.get(BASE_URL + 'api/tasks').then(function (Tasks) {
		$scope.tasks = Tasks.data;

		$scope.Relation_Type = 'project';

		$scope.AddTask = function () {
			if ($scope.isPublic === true) {
				$scope.isPublicValue = 1;
			} else {
				$scope.isPublicValue = 0;
			}
			if ($scope.isBillable === true) {
				$scope.isBillableValue = 1;
			} else {
				$scope.isBillableValue = 0;
			}
			if ($scope.isVisible === true) {
				$scope.isVisibleValue = 1;
			} else {
				$scope.isVisibleValue = 0;
			}
			if ($scope.Relation_Type === 'project') {
				$scope.related_with = $scope.RelatedProject.id;
			}
			if ($scope.Relation_Type === 'ticket') {
				$scope.related_with = $scope.RelatedTicket.id;
			}
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				name: $scope.task.name,
				hourly_rate: $scope.task.hourlyrate,
				assigned: $scope.task.assigned,
				priority: $scope.task.priority_id,
				relation_type: $scope.Relation_Type,
				relation: $scope.related_with,
				milestone: $scope.SelectedMilestone,
				status_id: $scope.task.status_id,
				public: $scope.isPublicValue,
				billable: $scope.isBillableValue,
				visible: $scope.isVisibleValue,
				startdate: moment($scope.task.startdate).format("YYYY-MM-DD"),
				duedate: moment($scope.task.duedate).format("YYYY-MM-DD"),
				description: $scope.task.description,
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'tasks/create/';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						window.location.href = BASE_URL + 'tasks/task/' + response.data;
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.filter = {};
		$scope.getOptionsFor = function (propName) {
			return ($scope.tasks || []).map(function (item) {
				return item[propName];
			}).filter(function (item, idx, arr) {
				return arr.indexOf(item) === idx;
			}).sort();
		};

		$scope.FilteredData = function (item) {
			// Use this snippet for matching with AND
			var matchesAND = true;
			for (var prop in $scope.filter) {
				if (noSubFilter($scope.filter[prop])) {
					continue;
				}
				if (!$scope.filter[prop][item[prop]]) {
					matchesAND = false;
					break;
				}
			}
			return matchesAND;

		};

		function noSubFilter(subFilterObj) {
			for (var key in subFilterObj) {
				if (subFilterObj[key]) {
					return false;
				}
			}
			return true;
		}
		// Filtered Datas
		$scope.search = {
			name: '',
		};
		$scope.itemsPerPage = 5;
		$scope.currentPage = 0;
		$scope.range = function () {
			var rangeSize = 5;
			var ps = [];
			var start;

			start = $scope.currentPage;
			//  console.log($scope.pageCount(),$scope.currentPage)
			if (start > $scope.pageCount() - rangeSize) {
				start = $scope.pageCount() - rangeSize + 1;
			}

			for (var i = start; i < start + rangeSize; i++) {
				if (i >= 0) {
					ps.push(i);
				}
			}
			return ps;
		};

		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.DisablePrevPage = function () {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
		};

		$scope.DisableNextPage = function () {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};

		$scope.setPage = function (n) {
			$scope.currentPage = n;
		};

		$scope.pageCount = function () {
			return Math.ceil($scope.tasks.length / $scope.itemsPerPage) - 1;
		};

	});

	$http.get(BASE_URL + 'api/projects').then(function (Projects) {
		$scope.projects = Projects.data;
	});

	$http.get(BASE_URL + 'api/milestones').then(function (Milestones) {
		$scope.milestones = Milestones.data;
	});
}

function Task_Controller($scope, $http, $mdSidenav, $mdDialog) {
	"use strict";

	$scope.Update = buildToggler('Update');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}

	$scope.close = function () {
		$mdSidenav('Update').close();
		$mdDialog.hide();
	};

	$scope.title = 'Sub Tasks';

	$scope.UploadFile = function (ev) {
		$mdDialog.show({
			templateUrl: 'addfile-template.html',
			scope: $scope,
			preserveScope: true,
			targetEvent: ev
		});
	};

	$http.get(BASE_URL + 'api/custom_fields_data_by_type/' + 'task/' + TASKID).then(function (custom_fields) {
		$scope.custom_fields = custom_fields.data;
	});

	$http.get(BASE_URL + 'api/task/' + TASKID).then(function (Task) {
		$scope.task = Task.data;

		$http.get(BASE_URL + 'api/project/' + $scope.task.relation).then(function (Project) {
			$scope.task.project_data = Project.data;
		});

		$scope.startTimerforTask = function () {
			var dataObj = $.param({
				task: TASKID,
				project: $scope.task.relation,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'tasks/starttimer', dataObj, config)
				.then(
					function (response) {
						$scope.task.timer = true;
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.stopTimerforTask = function () {
			var dataObj = $.param({
				task: TASKID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'tasks/stoptimer', dataObj, config)
				.then(
					function (response) {
						$scope.task.timer = false;
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};


		$scope.UpdateTask = function () {
			if ($scope.task.public === true) {
				$scope.isPublic = 1;
			} else {
				$scope.isPublic = 0;
			}
			if ($scope.task.visible === true) {
				$scope.isVisible = 1;
			} else {
				$scope.isVisible = 0;
			}
			if ($scope.task.billable === true) {
				$scope.isBillable = 1;
			} else {
				$scope.isBillable = 0;
			}
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				name: $scope.task.name,
				hourly_rate: $scope.task.hourlyrate,
				assigned: $scope.task.assigned,
				priority: $scope.task.priority_id,
				relation_type: $scope.task.relation_type,
				relation: $scope.task.relation,
				milestone: $scope.task.milestone,
				status_id: $scope.task.status_id,
				public: $scope.isPublic,
				billable: $scope.isBillable,
				visible: $scope.isVisible,
				startdate: moment($scope.task.startdate).format("YYYY-MM-DD"),
				duedate: moment($scope.task.duedate).format("YYYY-MM-DD"),
				description: $scope.task.description,
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'tasks/update/' + TASKID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('Update').close();
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.Delete = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Attention!')
				.textContent('Do you confirm the deletion of all data belonging to this task?')
				.ariaLabel('Delete Task')
				.targetEvent(TASKID)
				.ok('Do it!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'tasks/remove/' + TASKID, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'tasks';
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};

		$scope.DeleteFile = function (index) {
			var file = $scope.files[index];
			var dataObj = $.param({
				fileid: file.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'tasks/deletefile';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.files.splice($scope.files.indexOf(file), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$http.get(BASE_URL + 'api/tasktimelogs/' + TASKID).then(function (TimeLogs) {
		$scope.timelogs = TimeLogs.data;
		$scope.getTotal = function () {
			var total = 0;
			for (var i = 0; i < $scope.timelogs.length; i++) {
				var timelog = $scope.timelogs[i];
				total += (timelog.timed);
			}
			return total;
		};
		$scope.ProjectTotalAmount = function () {
			var total = 0;
			for (var i = 0; i < $scope.timelogs.length; i++) {
				var timelog = $scope.timelogs[i];
				total += (timelog.amount);
			}
			return total;
		};
	});

	$http.get(BASE_URL + 'api/milestones').then(function (Milestones) {
		$scope.milestones = Milestones.data;
	});

	$http.get(BASE_URL + 'api/taskfiles/' + TASKID).then(function (Files) {
		$scope.files = Files.data;
	});

	$http.get(BASE_URL + 'api/subtasks/' + TASKID).then(function (Subtasks) {
		$scope.subtasks = Subtasks.data;
		$scope.createTask = function () {
			var dataObj = $.param({
				description: $scope.newTitle,
				taskid: TASKID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'tasks/addsubtask';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.subtasks.unshift({
							description: $scope.newTitle,
							date: Date.now()
						});
						$scope.newTitle = '';
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.removeTask = function (index) {
			var subtask = $scope.subtasks[index];
			var dataObj = $.param({
				subtask: subtask.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'tasks/removesubtasks', dataObj, config)
				.then(
					function (response) {
						$scope.subtasks.splice($scope.subtasks.indexOf(subtask), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.completeTask = function (index) {
			var subtask = $scope.subtasks[index];
			var dataObj = $.param({
				subtask: subtask.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'tasks/completesubtasks', dataObj, config)
				.then(
					function (response) {
						subtask.complete = true;
						$scope.subtasks.splice($scope.subtasks.indexOf(subtask), 1);
						$scope.SubTasksComplete.unshift(subtask);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.uncompleteTask = function (index) {
			var task = $scope.SubTasksComplete[index];
			var dataObj = $.param({
				task: task.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'tasks/uncompletesubtasks', dataObj, config)
				.then(
					function (response) {
						var task = $scope.SubTasksComplete[index];
						$scope.SubTasksComplete.splice($scope.SubTasksComplete.indexOf(task), 1);
						$scope.subtasks.unshift(task);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};

	});

	$http.get(BASE_URL + 'api/subtaskscomplete/' + TASKID).then(function (SubTasksComplete) {
		$scope.taskCompletionTotal = function (unit) {
			var total = $scope.taskLength();
			return Math.floor(100 / total * unit);
		};
		$scope.SubTasksComplete = SubTasksComplete.data;
		$scope.taskLength = function () {
			return $scope.subtasks.length + $scope.SubTasksComplete.length;
		};
	});

	$scope.MarkAsCompleteTask = function () {
		var dataObj = $.param({
			task: TASKID,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		$http.post(BASE_URL + 'tasks/markascompletetask', dataObj, config)
			.then(
				function (response) {
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: 'Task Marked as Complete',
						class_name: 'color success'
					});
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.MarkAsCancelled = function () {
		var dataObj = $.param({
			task: TASKID,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		$http.post(BASE_URL + 'tasks/markascancelled', dataObj, config)
			.then(
				function (response) {
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: 'Task marked as cancelled',
						class_name: 'color danger'
					});
					console.log(response);
				},
				function (response) {
					console.log(response);
				}
			);
	};
}

function Expenses_Controller($scope, $http, $mdSidenav, $mdDialog, $filter) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_by_type/' + 'expense').then(function (custom_fields) {
		$scope.all_custom_fields = custom_fields.data;
		$scope.custom_fields = $filter('filter')($scope.all_custom_fields, {
			active: 'true',
		});
	});

	$scope.NewExpense = buildToggler('NewExpense');
	$scope.toggleFilter = buildToggler('ContentFilter');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();
		};
	}

	$scope.close = function () {
		$mdSidenav('NewExpense').close();
		$mdSidenav('ContentFilter').close();
		$mdDialog.hide();
	};

	$http.get(BASE_URL + 'api/expenses').then(function (Expenses) {
		$scope.expenses = Expenses.data;


		$scope.AddExpense = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				title: $scope.newexpense.title,
				amount: $scope.newexpense.amount,
				date: moment($scope.newexpense.date).format("YYYY-MM-DD"),
				category: $scope.newexpense.category,
				account: $scope.newexpense.account,
				description: $scope.newexpense.description,
				customer: $scope.newexpense.customer,
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'expenses/create/';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('NewExpense').close();
						window.location.href = BASE_URL + 'expenses/receipt/' + response.data;
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.search = {
			title: '',
		};
		// Filtered Datas
		$scope.filter = {};
		$scope.getOptionsFor = function (propName) {
			return ($scope.expenses || []).map(function (item) {
				return item[propName];
			}).filter(function (item, idx, arr) {
				return arr.indexOf(item) === idx;
			}).sort();
		};
		$scope.FilteredData = function (item) {
			// Use this snippet for matching with AND
			var matchesAND = true;
			for (var prop in $scope.filter) {
				if (noSubFilter($scope.filter[prop])) {
					continue;
				}
				if (!$scope.filter[prop][item[prop]]) {
					matchesAND = false;
					break;
				}
			}
			return matchesAND;
		};

		function noSubFilter(subFilterObj) {
			for (var key in subFilterObj) {
				if (subFilterObj[key]) {
					return false;
				}
			}
			return true;
		}
		// Filtered Datas
		$scope.itemsPerPage = 5;
		$scope.currentPage = 0;
		$scope.range = function () {
			var rangeSize = 5;
			var ps = [];
			var start;

			start = $scope.currentPage;
			//  console.log($scope.pageCount(),$scope.currentPage)
			if (start > $scope.pageCount() - rangeSize) {
				start = $scope.pageCount() - rangeSize + 1;
			}

			for (var i = start; i < start + rangeSize; i++) {
				if (i >= 0) {
					ps.push(i);
				}
			}
			return ps;
		};

		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.DisablePrevPage = function () {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
		};

		$scope.DisableNextPage = function () {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};

		$scope.setPage = function (n) {
			$scope.currentPage = n;
		};

		$scope.pageCount = function () {
			return Math.ceil($scope.expenses.length / $scope.itemsPerPage) - 1;
		};
	});

	$http.get(BASE_URL + 'api/accounts').then(function (Accounts) {
		$scope.accounts = Accounts.data;
	});

	$http.get(BASE_URL + 'api/expensescategories').then(function (Categories) {
		$scope.categories = Categories.data;

		$scope.NewCategory = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.prompt()
				.title('New Category')
				.textContent('Please type category name')
				.placeholder('Category Name')
				.ariaLabel('Category Name')
				.initialValue('')
				.required(true)
				.ok('Add!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function (result) {
				var dataObj = $.param({
					name: result,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'expenses/add_category/', dataObj, config)
					.then(
						function (response) {
							console.log(response);
							$scope.categories.push({
								'id': response.data,
								'name': result,
								'amountby': 0,
								'percent': 0,
							});
						},
						function (response) {
							console.log(response);
						}
					);
			}, function () {

			});
		};

		$scope.UpdateCategory = function (index) {
			var Category = $scope.categories[index];
			var confirm = $mdDialog.prompt()
				.title('Update Category')
				.textContent('Type new category name.')
				.placeholder('Category Name')
				.ariaLabel('Category Name')
				.initialValue(Category.name)
				.targetEvent(event)
				.required(true)
				.ok('Save')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function (result) {
				var dataObj = $.param({
					name: result,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'expenses/update_category/' + Category.id, dataObj, config)
					.then(
						function () {
							Category.name = result;
						},
						function () {
							//UNSUCCESS
						}
					);
			}, function () {
				//Cancel
			});
		};

		$scope.Remove = function (index) {
			var Category = $scope.categories[index];
			var confirm = $mdDialog.confirm()
				.title('Attention!')
				.textContent('Do you confirm the deletion of all data belonging to this expense?')
				.ariaLabel('Delete Project')
				.targetEvent(Category.id)
				.ok('Do it!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'expenses/remove_category/' + Category.id, config)
					.then(
						function (response) {
							console.log(response);
							$scope.categories.splice(index, 1);
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};

	});
}

function Expense_Controller($scope, $http, $mdSidenav, $mdDialog) {
	"use strict";

	$scope.Update = buildToggler('Update');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();
		};
	}

	$scope.close = function () {
		$mdSidenav('Update').close();
		$mdDialog.hide();
	};

	$http.get(BASE_URL + 'api/custom_fields_data_by_type/' + 'expense/' + EXPENSEID).then(function (custom_fields) {
		$scope.custom_fields = custom_fields.data;
	});

	$http.get(BASE_URL + 'api/expense/' + EXPENSEID).then(function (Expense) {
		$scope.expense = Expense.data;
		$scope.UpdateExpense = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				title: $scope.expense.title,
				amount: $scope.expense.amount,
				date: moment($scope.expense.date).format("YYYY-MM-DD"),
				category: $scope.expense.category,
				account: $scope.expense.account,
				description: $scope.expense.description,
				customer: $scope.expense.customer,
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'expenses/update/' + EXPENSEID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('Update').close();
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.Delete = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Attention!')
				.textContent('Do you confirm the deletion of all data belonging to this expense?')
				.ariaLabel('Delete Project')
				.targetEvent(EXPENSEID)
				.ok('Do it!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'expenses/remove/' + EXPENSEID, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'expenses';
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};
		$scope.Convert = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Information!')
				.textContent('Do you want to convert this expense to invoice?')
				.ariaLabel('Convert Expense to Invoice')
				.targetEvent(EXPENSEID)
				.ok('Convert!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'expenses/convert/' + EXPENSEID, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'invoices/update' + response.data;
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};
	});

	$http.get(BASE_URL + 'api/accounts').then(function (Accounts) {
		$scope.accounts = Accounts.data;
	});

	$http.get(BASE_URL + 'api/expensescategories').then(function (Epxensescategories) {
		$scope.expensescategories = Epxensescategories.data;
	});

}

function Invoices_Controller($scope, $http, $mdSidenav, $q, $timeout, $filter) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_by_type/' + 'invoice').then(function (custom_fields) {
		$scope.all_custom_fields = custom_fields.data;
		$scope.custom_fields = $filter('filter')($scope.all_custom_fields, {
			active: 'true',
		});
	});

	$http.get(BASE_URL + 'api/products').then(function (Products) {
		$scope.products = Products.data;
	});

	$scope.GetProduct = (function (search) {
		console.log(search);
		var deferred = $q.defer();
		$timeout(function () {
			deferred.resolve($scope.products);
		}, Math.random() * 500, false);
		return deferred.promise;
	});

	$scope.invoice = {
		items: [{
			name: 'New',
			product_id: 0,
			code: '',
			description: '',
			quantity: 1,
			unit: 'Unit',
			price: 0,
			tax: 0,
			discount: 0,
		}]
	};

	$scope.add = function () {
		$scope.invoice.items.push({
			name: 'New',
			product_id: 0,
			code: '',
			description: '',
			quantity: 1,
			unit: 'Unit',
			price: 0,
			tax: 0,
			discount: 0,
		});
	};

	$scope.remove = function (index) {
		$scope.invoice.items.splice(index, 1);
	};

	$scope.subtotal = function () {
		var subtotal = 0;
		angular.forEach($scope.invoice.items, function (item) {
			subtotal += item.quantity * item.price;
		});
		return subtotal.toFixed(2);
	};

	$scope.linediscount = function () {
		var linediscount = 0;
		angular.forEach($scope.invoice.items, function (item) {
			linediscount += ((item.discount) / 100 * item.quantity * item.price);
		});
		return linediscount.toFixed(2);
	};

	$scope.totaltax = function () {
		var totaltax = 0;
		angular.forEach($scope.invoice.items, function (item) {
			totaltax += ((item.tax) / 100 * item.quantity * item.price);
		});
		return totaltax.toFixed(2);
	};

	$scope.grandtotal = function () {
		var grandtotal = 0;
		angular.forEach($scope.invoice.items, function (item) {
			grandtotal += item.quantity * item.price + ((item.tax) / 100 * item.quantity * item.price) - ((item.discount) / 100 * item.quantity * item.price);
		});
		return grandtotal.toFixed(2);
	};

	$scope.saveAll = function () {
		if ($scope.invoice.shipping_country) {
			$scope.shipping_country = $scope.invoice.shipping_country.id;
		} else {
			$scope.shipping_country = null;
		}
		if ($scope.invoice.billing_country) {
			$scope.billing_country = $scope.invoice.billing_country.id;
		} else {
			$scope.billing_country = null;
		}
		$scope.tempArr = [];
		angular.forEach($scope.custom_fields, function (value) {
			if (value.type === 'input') {
				$scope.field_data = value.data;
			}
			if (value.type === 'textarea') {
				$scope.field_data = value.data;
			}
			if (value.type === 'date') {
				$scope.field_data = moment(value.data).format("YYYY-MM-DD");
			}
			if (value.type === 'select') {
				$scope.field_data = JSON.stringify(value.selected_opt);
			}
			$scope.tempArr.push({
				id: value.id,
				name: value.name,
				type: value.type,
				order: value.order,
				data: $scope.field_data,
				relation: value.relation,
				permission: value.permission,
			});
		});
		var dataObj = $.param({
			customer: $scope.customer.id,
			created: moment($scope.created).format("YYYY-MM-DD"),
			duedate: moment($scope.duedate).format("YYYY-MM-DD"),
			datepayment: moment($scope.datepayment).format("YYYY-MM-DD"),
			account: $scope.account,
			duenote: $scope.duenote,
			serie: $scope.serie,
			no: $scope.no,
			sub_total: $scope.subtotal,
			total_discount: $scope.linediscount,
			total_tax: $scope.totaltax,
			total: $scope.grandtotal,
			status: $scope.invoice_status,
			// Billing Address
			billing_street: $scope.invoice.billing_street,
			billing_city: $scope.invoice.billing_city,
			billing_state: $scope.invoice.billing_state,
			billing_zip: $scope.invoice.billing_zip,
			billing_country: $scope.billing_country,
			// Shipping Address
			shipping_street: $scope.invoice.shipping_street,
			shipping_city: $scope.invoice.shipping_city,
			shipping_state: $scope.invoice.shipping_state,
			shipping_zip: $scope.invoice.shipping_zip,
			shipping_country: $scope.shipping_country,
			// START Recurring
			recurring: $scope.invoice_recurring,
			end_recurring: moment($scope.EndRecurring).format("YYYY-MM-DD 00:00:00"),
			recurring_type: $scope.recurring_type,
			recurring_period: $scope.recurring_period,
			// END Recurring
			items: $scope.invoice.items,
			custom_fields: $scope.tempArr,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'invoices/create';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					window.location.href = BASE_URL + 'invoices/invoice/' + response.data;
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.CopyBillingFromCustomer = function () {
		$scope.invoice.billing_street = $scope.customer.billing_street;
		$scope.invoice.billing_city = $scope.customer.billing_city;
		$scope.invoice.billing_state = $scope.customer.billing_state;
		$scope.invoice.billing_zip = $scope.customer.billing_zip;
		$scope.invoice.billing_country = $scope.customer.billing_country;
	};

	$scope.CopyShippingFromCustomer = function () {
		$scope.invoice.shipping_street = $scope.customer.shipping_street;
		$scope.invoice.shipping_city = $scope.customer.shipping_city;
		$scope.invoice.shipping_state = $scope.customer.shipping_state;
		$scope.invoice.shipping_zip = $scope.customer.shipping_zip;
		$scope.invoice.shipping_country = $scope.customer.shipping_country;
	};

	$http.get(BASE_URL + 'api/accounts').then(function (Accounts) {
		$scope.accounts = Accounts.data;
	});

	$scope.SelectedCustomer = $scope.customer;

	$http.get(BASE_URL + 'api/invoices').then(function (Invoices) {
		$scope.invoices = Invoices.data;
		$scope.search = {
			customer: ''
		};
		// Filter Buttons //
		$scope.toggleFilter = buildToggler('ContentFilter');

		function buildToggler(navID) {
			return function () {
				$mdSidenav(navID).toggle();

			};
		}
		$scope.close = function () {
			$mdSidenav('ContentFilter').close();
		};
		// Filter Buttons //
		// Filtered Datas
		$scope.filter = {};
		$scope.getOptionsFor = function (propName) {
			return ($scope.invoices || []).map(function (item) {
				return item[propName];
			}).filter(function (item, idx, arr) {
				return arr.indexOf(item) === idx;
			}).sort();
		};
		$scope.FilteredData = function (item) {
			// Use this snippet for matching with AND
			var matchesAND = true;
			for (var prop in $scope.filter) {
				if (noSubFilter($scope.filter[prop])) {
					continue;
				}
				if (!$scope.filter[prop][item[prop]]) {
					matchesAND = false;
					break;
				}
			}
			return matchesAND;

		};

		function noSubFilter(subFilterObj) {
			for (var key in subFilterObj) {
				if (subFilterObj[key]) {
					return false;
				}
			}
			return true;
		}
		$scope.updateDropdown = function (_prop) {
				var _opt = this.filter_select,
					_optList = this.getOptionsFor(_prop),
					len = _optList.length;

				if (_opt == 'all') {
					for (var j = 0; j < len; j++) {
						$scope.filter[_prop][_optList[j]] = true;
					}
				} else {
					for (var j = 0; j < len; j++) {
						$scope.filter[_prop][_optList[j]] = false;
					}
					$scope.filter[_prop][_opt] = true;
				}
			}
			// Filtered Datas
		$scope.itemsPerPage = 5;
		$scope.currentPage = 0;
		$scope.range = function () {
			var rangeSize = 5;
			var ps = [];
			var start;

			start = $scope.currentPage;
			//  console.log($scope.pageCount(),$scope.currentPage)
			if (start > $scope.pageCount() - rangeSize) {
				start = $scope.pageCount() - rangeSize + 1;
			}

			for (var i = start; i < start + rangeSize; i++) {
				if (i >= 0) {
					ps.push(i);
				}
			}
			return ps;
		};

		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.DisablePrevPage = function () {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
		};

		$scope.DisableNextPage = function () {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};

		$scope.setPage = function (n) {
			$scope.currentPage = n;
		};

		$scope.pageCount = function () {
			return Math.ceil($scope.invoices.length / $scope.itemsPerPage) - 1;
		};
	});
}

function Invoice_Controller($scope, $http, $mdSidenav, $mdDialog, $q, $timeout, $filter) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_data_by_type/' + 'invoice/' + INVOICEID).then(function (custom_fields) {
		$scope.custom_fields = custom_fields.data;
	});

	$scope.GeneratePDF = function (ev) {
		$mdDialog.show({
			templateUrl: 'generate-invoice.html',
			scope: $scope,
			preserveScope: true,
			targetEvent: ev
		});
	};

	$scope.CreatePDF = function () {
		$scope.PDFCreating = true;
		$http.post(BASE_URL + 'invoices/create_pdf/' + INVOICEID)
			.then(
				function (response) {
					console.log(response);
					if (response.data.status === true) {
						$scope.PDFCreating = false;
						$scope.CreatedPDFName = response.data.file_name;
					}
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.Delete = function () {
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = $mdDialog.confirm()
			.title($scope.lang.deleteinvoice)
			.textContent($scope.lang.inv_remove_msg)
			.ariaLabel('Delete Invoice')
			.targetEvent(INVOICEID)
			.ok($scope.lang.delete)
			.cancel($scope.lang.cancel);

		$mdDialog.show(confirm).then(function () {
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'invoices/remove/' + INVOICEID, config)
				.then(
					function (response) {
						console.log(response);
						window.location.href = BASE_URL + 'invoices';
					},
					function (response) {
						console.log(response);
					}
				);

		}, function () {
			//
		});
	};

	$http.get(BASE_URL + 'api/invoice/' + INVOICEID).then(function (InvoiceDetails) {
		$scope.invoice = InvoiceDetails.data;
		$http.get(BASE_URL + 'api/contacts').then(function (Contacts) {
			$scope.all_contacts = Contacts.data;
			$scope.contacts = $filter('filter')($scope.all_contacts, {
				customer_id: $scope.invoice.customer,
			});
		});
		$scope.MarkAsDraft = function () {
			$http.post(BASE_URL + 'invoices/mark_as_draft/' + INVOICEID)
				.then(
					function (response) {
						console.log(response);
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color success'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.MarkAsCancelled = function () {
			$http.post(BASE_URL + 'invoices/mark_as_cancelled/' + INVOICEID)
				.then(
					function (response) {
						console.log(response);
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color danger'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.subtotal = function () {
			var subtotal = 0;
			angular.forEach($scope.invoice.items, function (item) {
				subtotal += item.quantity * item.price;
			});
			return subtotal.toFixed(2);
		};
		$scope.linediscount = function () {
			var linediscount = 0;
			angular.forEach($scope.invoice.items, function (item) {
				linediscount += ((item.discount) / 100 * item.quantity * item.price);
			});
			return linediscount.toFixed(2);
		};
		$scope.totaltax = function () {
			var totaltax = 0;
			angular.forEach($scope.invoice.items, function (item) {
				totaltax += ((item.tax) / 100 * item.quantity * item.price);
			});
			return totaltax.toFixed(2);
		};
		$scope.grandtotal = function () {
			var grandtotal = 0;
			angular.forEach($scope.invoice.items, function (item) {
				grandtotal += item.quantity * item.price + ((item.tax) / 100 * item.quantity * item.price) - ((item.discount) / 100 * item.quantity * item.price);
			});
			return grandtotal.toFixed(2);
		};

		$scope.totalpaid = function () {
			return $scope.invoice.payments.reduce(function (total, payment) {
				return total + (payment.amount * 1 || 0);
			}, 0);
		};

		$scope.amount = $scope.invoice.balance;

		$http.get(BASE_URL + 'api/products').then(function (Products) {
			$scope.products = Products.data;
		});

		$scope.GetProduct = (function (search) {
			console.log(search);
			var deferred = $q.defer();
			$timeout(function () {
				deferred.resolve($scope.products);
			}, Math.random() * 500, false);
			return deferred.promise;
		});

		$scope.add = function () {
			$scope.invoice.items.push({
				name: 'New',
				product_id: 0,
				code: '',
				description: '',
				quantity: 1,
				unit: 'Unit',
				price: 0,
				tax: 0,
				discount: 0,
			});
		};

		$scope.remove = function (index) {
			var item = $scope.invoice.items[index];
			$http.post(BASE_URL + 'invoices/remove_item/' + item.id)
				.then(
					function (response) {
						console.log(response);
						$scope.invoice.items.splice(index, 1);
						$scope.invoice.balance = $scope.invoice.balance - item.total;
						$scope.amount = $scope.invoice.balance;
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.saveAll = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				customer: $scope.invoice.customer,
				created: moment($scope.invoice.created).format("YYYY-MM-DD"),
				duedate: moment($scope.invoice.duedate).format("YYYY-MM-DD"),
				duenote: $scope.invoice.duenote,
				serie: $scope.invoice.serie,
				no: $scope.invoice.no,
				sub_total: $scope.subtotal,
				total_discount: $scope.linediscount,
				total_tax: $scope.totaltax,
				total: $scope.grandtotal,
				// START Recurring
				recurring_status: $scope.invoice.recurring_status,
				end_recurring: moment($scope.invoice.recurring_endDate).format("YYYY-MM-DD 00:00:00"),
				recurring_type: $scope.invoice.recurring_type,
				recurring_period: $scope.invoice.recurring_period,
				recurring_id: $scope.invoice.recurring_id,
				// END Recurring
				items: $scope.invoice.items,
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'invoices/update/' + INVOICEID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						window.location.href = BASE_URL + 'invoices/invoice/' + response.data;
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$scope.UodateInvoice = function (id) {
		window.location.href = BASE_URL + 'invoices/update/' + id;
	};

	$scope.RecordPayment = buildToggler('RecordPayment');
	$scope.Discussions = buildToggler('Discussions');
	$scope.NewDiscussion = buildToggler('NewDiscussion');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}

	$scope.close = function () {
		$mdSidenav('RecordPayment').close();
		$mdSidenav('Discussions').close();
		$mdSidenav('NewDiscussion').close();
	};
	$scope.CloseModal = function () {
		$mdDialog.hide();
	};

	$http.get(BASE_URL + 'api/discussions/invoice/' + INVOICEID).then(function (Discussions) {
		$scope.discussions = Discussions.data;
		$scope.Discussion_Detail = function (index) {
			var discussion = $scope.discussions[index];
			$scope.discussions_comments = discussion.comments;
			$scope.AddComment = function (index) {
				var discussion = $scope.discussions[index];
				var dataObj = $.param({
					discussion_id: discussion.id,
					content: discussion.newcontent,
					contact_id: discussion.contact_id,
					full_name: LOGGEDINSTAFFNAME,

				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				var posturl = BASE_URL + 'trivia/add_discussion_comment';
				$http.post(posturl, dataObj, config)
					.then(
						function (response) {
							console.log(response);
							$scope.discussions_comments.push({
								'content': discussion.newcontent,
								'full_name': LOGGEDINSTAFFNAME,
								'created': new Date(),
							});
							$('.comment-description').val('');
						},
						function (response) {
							console.log(response);
						}
					);
			};
			$mdDialog.show({
				contentElement: '#Discussion_Detail-' + discussion.id,
				parent: angular.element(document.body),
				targetEvent: index,
				clickOutsideToClose: true
			});
		};
	});

	$scope.ShowCustomer = false;

	$scope.CreateDiscussion = function () {
		var dataObj = $.param({
			relation_type: 'invoice',
			relation: INVOICEID,
			subject: $scope.new_discussion.subject,
			description: $scope.new_discussion.description,
			contact_id: $scope.new_discussion.contact_id,
			show_to_customer: $scope.ShowCustomer,
			staff_id: ACTIVESTAFF,

		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'trivia/create_discussion';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					$scope.discussions.push({
						'id': response.data,
						'subject': $scope.new_discussion.subject,
						'contact': $scope.new_discussion.contact_id,
					});
					$mdSidenav('NewDiscussion').close();
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$http.get(BASE_URL + 'api/accounts').then(function (Accounts) {
		$scope.accounts = Accounts.data;
	});

	$scope.AddPayment = function () {
		var dataObj = $.param({
			date: moment($scope.date).format("YYYY-MM-DD HH:mm:ss"),
			balance: $scope.invoice.balance - $scope.amount,
			amount: $scope.amount,
			not: $scope.not,
			account: $scope.account,
			invoicetotal: $scope.grandtotal,
			staff: ACTIVESTAFF,
			customer: INVOICECUSTOMER,
			invoice: INVOICEID,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'invoices/record_payment';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					$scope.invoice.payments.push({
						'name': $scope.account,
						'amount': $scope.amount,
					});
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: response.data,
						position: 'bottom',
						class_name: 'color success',
					});
					$mdSidenav('RecordPayment').close();
					$scope.invoice.balance = $scope.invoice.balance - $scope.amount;
				},
				function (response) {
					console.log(response);
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: response.data,
						position: 'bottom',
						class_name: 'color warning',
					});
				}
			);
	};
}

function Proposals_Controller($scope, $http, $mdSidenav, $q, $timeout, $filter) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_by_type/' + 'proposal').then(function (custom_fields) {
		$scope.all_custom_fields = custom_fields.data;
		$scope.custom_fields = $filter('filter')($scope.all_custom_fields, {
			active: 'true',
		});
	});

	$http.get(BASE_URL + 'api/products').then(function (Products) {
		$scope.products = Products.data;
	});

	$http.get(BASE_URL + 'api/leads').then(function (Leads) {
		$scope.leads = Leads.data;
	});


	$scope.GetProduct = (function (search) {
		console.log(search);
		var deferred = $q.defer();
		$timeout(function () {
			deferred.resolve($scope.products);
		}, Math.random() * 500, false);
		return deferred.promise;
	});

	$scope.proposal = {
		items: [{
			name: 'New',
			product_id: 0,
			code: '',
			description: '',
			quantity: 1,
			unit: 'Unit',
			price: 0,
			tax: 0,
			discount: 0,
		}]
	};

	$scope.add = function () {
		$scope.proposal.items.push({
			name: 'New',
			product_id: 0,
			code: '',
			description: '',
			quantity: 1,
			unit: 'Unit',
			price: 0,
			tax: 0,
			discount: 0,
		});
	};

	$scope.remove = function (index) {
		$scope.proposal.items.splice(index, 1);
	};

	$scope.subtotal = function () {
		var subtotal = 0;
		angular.forEach($scope.proposal.items, function (item) {
			subtotal += item.quantity * item.price;
		});
		return subtotal.toFixed(2);
	};

	$scope.linediscount = function () {
		var linediscount = 0;
		angular.forEach($scope.proposal.items, function (item) {
			linediscount += ((item.discount) / 100 * item.quantity * item.price);
		});
		return linediscount.toFixed(2);
	};

	$scope.totaltax = function () {
		var totaltax = 0;
		angular.forEach($scope.proposal.items, function (item) {
			totaltax += ((item.tax) / 100 * item.quantity * item.price);
		});
		return totaltax.toFixed(2);
	};

	$scope.grandtotal = function () {
		var grandtotal = 0;
		angular.forEach($scope.proposal.items, function (item) {
			grandtotal += item.quantity * item.price + ((item.tax) / 100 * item.quantity * item.price) - ((item.discount) / 100 * item.quantity * item.price);
		});
		return grandtotal.toFixed(2);
	};

	$scope.saveAll = function () {
		$scope.tempArr = [];
		angular.forEach($scope.custom_fields, function (value) {
			if (value.type === 'input') {
				$scope.field_data = value.data;
			}
			if (value.type === 'textarea') {
				$scope.field_data = value.data;
			}
			if (value.type === 'date') {
				$scope.field_data = moment(value.data).format("YYYY-MM-DD");
			}
			if (value.type === 'select') {
				$scope.field_data = JSON.stringify(value.selected_opt);
			}
			$scope.tempArr.push({
				id: value.id,
				name: value.name,
				type: value.type,
				order: value.order,
				data: $scope.field_data,
				relation: value.relation,
				permission: value.permission,
			});
		});
		var dataObj = $.param({
			customer: $scope.customer,
			lead: $scope.lead,
			comment: $scope.comment,
			subject: $scope.subject,
			content: $scope.content,
			date: moment($scope.created).format("YYYY-MM-DD"),
			created: moment($scope.created).format("YYYY-MM-DD"),
			opentill: moment($scope.opentill).format("YYYY-MM-DD"),
			proposal_type: $scope.proposal_type,
			status: $scope.status,
			assigned: $scope.assigned,
			sub_total: $scope.subtotal,
			total_discount: $scope.linediscount,
			total_tax: $scope.totaltax,
			total: $scope.grandtotal,
			items: $scope.proposal.items,
			custom_fields: $scope.tempArr,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'proposals/create';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					window.location.href = BASE_URL + 'proposals/proposal/' + response.data;
				},
				function (response) {
					console.log(response);
				}
			);
	};


	$http.get(BASE_URL + 'api/proposals').then(function (Proposals) {
		$scope.proposals = Proposals.data;
		$scope.search = {
			subject: '',
		};
		// Filter Buttons //
		$scope.toggleFilter = buildToggler('ContentFilter');

		function buildToggler(navID) {
			return function () {
				$mdSidenav(navID).toggle();

			};
		}
		$scope.close = function () {
			$mdSidenav('ContentFilter').close();
		};
		// Filter Buttons //
		// Filtered Datas
		$scope.filter = {};
		$scope.getOptionsFor = function (propName) {
			return ($scope.proposals || []).map(function (item) {
				return item[propName];
			}).filter(function (item, idx, arr) {
				return arr.indexOf(item) === idx;
			}).sort();
		};
		$scope.FilteredData = function (item) {
			// Use this snippet for matching with AND
			var matchesAND = true;
			for (var prop in $scope.filter) {
				if (noSubFilter($scope.filter[prop])) {
					continue;
				}
				if (!$scope.filter[prop][item[prop]]) {
					matchesAND = false;
					break;
				}
			}
			return matchesAND;

		};

		function noSubFilter(subFilterObj) {
			for (var key in subFilterObj) {
				if (subFilterObj[key]) {
					return false;
				}
			}
			return true;
		}
		$scope.updateDropdown = function (_prop) {
				var _opt = this.filter_select,
					_optList = this.getOptionsFor(_prop),
					len = _optList.length;

				if (_opt == 'all') {
					for (var j = 0; j < len; j++) {
						$scope.filter[_prop][_optList[j]] = true;
					}
				} else {
					for (var j = 0; j < len; j++) {
						$scope.filter[_prop][_optList[j]] = false;
					}
					$scope.filter[_prop][_opt] = true;
				}
			}
			// Filtered Datas
		$scope.itemsPerPage = 5;
		$scope.currentPage = 0;
		$scope.range = function () {
			var rangeSize = 5;
			var ps = [];
			var start;

			start = $scope.currentPage;
			//  console.log($scope.pageCount(),$scope.currentPage)
			if (start > $scope.pageCount() - rangeSize) {
				start = $scope.pageCount() - rangeSize + 1;
			}

			for (var i = start; i < start + rangeSize; i++) {
				if (i >= 0) {
					ps.push(i);
				}
			}
			return ps;
		};

		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.DisablePrevPage = function () {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
		};

		$scope.DisableNextPage = function () {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};

		$scope.setPage = function (n) {
			$scope.currentPage = n;
		};

		$scope.pageCount = function () {
			return Math.ceil($scope.proposals.length / $scope.itemsPerPage) - 1;
		};
	});
}

function Proposal_Controller($scope, $http, $mdSidenav, $mdDialog, $q, $timeout) {
	"use strict";

	$scope.GeneratePDF = function (ev) {
		$mdDialog.show({
			templateUrl: 'generate-proposal.html',
			scope: $scope,
			preserveScope: true,
			targetEvent: ev
		});
	};

	$scope.CreatePDF = function () {
		$scope.PDFCreating = true;
		$http.post(BASE_URL + 'proposals/create_pdf/' + PROPOSALID)
			.then(
				function (response) {
					console.log(response);
					if (response.data.status === true) {
						$scope.PDFCreating = false;
						$scope.CreatedPDFName = response.data.file_name;
					}
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$http.get(BASE_URL + 'api/custom_fields_data_by_type/' + 'proposal/' + PROPOSALID).then(function (custom_fields) {
		$scope.custom_fields = custom_fields.data;
	});

	$http.get(BASE_URL + 'api/proposal/' + PROPOSALID).then(function (ProposalDetails) {
		$scope.proposal = ProposalDetails.data;


		$scope.Convert = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Information!')
				.textContent('Do you want to convert this proposal to invoice?')
				.ariaLabel('Convert')
				.targetEvent(PROPOSALID)
				.ok('Convert!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var dataObj = $.param({
					total: $scope.ProjectTotalAmount,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'proposals/convert_invoice/' + PROPOSALID, dataObj, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'invoices/update/' + response.data;
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};

		$scope.Update = function () {
			window.location.href = BASE_URL + 'proposals/update/' + PROPOSALID;
		};

		$scope.ViewProposal = function () {
			window.location.href = BASE_URL + 'share/proposal/' + $scope.proposal.token;
		};

		$scope.Delete = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title($scope.lang.delete_proposal)
				.textContent($scope.lang.proposal_remove_msg)
				.ariaLabel('Delete Proposal')
				.targetEvent(PROPOSALID)
				.ok($scope.lang.delete)
				.cancel($scope.lang.cancel);

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'proposals/remove/' + PROPOSALID, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'proposals';
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};

		$scope.MarkAs = function (id, name) {
			var dataObj = $.param({
				status_id: id,
				proposal_id: PROPOSALID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'proposals/markas/';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: '<b>Proposal marked as' + ' ' + name + '</b>',
							class_name: 'color success'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.subtotal = function () {
			var subtotal = 0;
			angular.forEach($scope.proposal.items, function (item) {
				subtotal += item.quantity * item.price;
			});
			return subtotal.toFixed(2);
		};
		$scope.linediscount = function () {
			var linediscount = 0;
			angular.forEach($scope.proposal.items, function (item) {
				linediscount += ((item.discount) / 100 * item.quantity * item.price);
			});
			return linediscount.toFixed(2);
		};
		$scope.totaltax = function () {
			var totaltax = 0;
			angular.forEach($scope.proposal.items, function (item) {
				totaltax += ((item.tax) / 100 * item.quantity * item.price);
			});
			return totaltax.toFixed(2);
		};
		$scope.grandtotal = function () {
			var grandtotal = 0;
			angular.forEach($scope.proposal.items, function (item) {
				grandtotal += item.quantity * item.price + ((item.tax) / 100 * item.quantity * item.price) - ((item.discount) / 100 * item.quantity * item.price);
			});
			return grandtotal.toFixed(2);
		};

		$http.get(BASE_URL + 'api/products').then(function (Products) {
			$scope.products = Products.data;
		});

		$http.get(BASE_URL + 'api/leads').then(function (Leads) {
			$scope.leads = Leads.data;
		});

		$scope.GetProduct = (function (search) {
			console.log(search);
			var deferred = $q.defer();
			$timeout(function () {
				deferred.resolve($scope.products);
			}, Math.random() * 500, false);
			return deferred.promise;
		});

		$scope.add = function () {
			$scope.proposal.items.push({
				name: 'New',
				product_id: 0,
				code: '',
				description: '',
				quantity: 1,
				unit: 'Unit',
				price: 0,
				tax: 0,
				discount: 0,
			});
		};
		$scope.remove = function (index) {
			var item = $scope.proposal.items[index];
			$http.post(BASE_URL + 'proposals/remove_item/' + item.id)
				.then(
					function (response) {
						console.log(response);
						$scope.proposal.items.splice(index, 1);
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.ProType = $scope.proposal.proposal_type;

		$scope.saveAll = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				customer: $scope.proposal.customer,
				lead: $scope.proposal.lead,
				comment: $scope.proposal.comment,
				subject: $scope.proposal.subject,
				content: $scope.proposal.content,
				date: moment($scope.proposal.created).format("YYYY-MM-DD"),
				created: moment($scope.proposal.created).format("YYYY-MM-DD"),
				opentill: moment($scope.proposal.opentill).format("YYYY-MM-DD"),
				proposal_type: $scope.ProType,
				status: $scope.proposal.status,
				assigned: $scope.proposal.assigned,
				sub_total: $scope.subtotal,
				total_discount: $scope.linediscount,
				total_tax: $scope.totaltax,
				total: $scope.grandtotal,
				items: $scope.proposal.items,
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'proposals/update/' + PROPOSALID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						window.location.href = BASE_URL + 'proposals/proposal/' + response.data;
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$scope.ReminderForm = buildToggler('ReminderForm');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}
	$scope.close = function () {
		$mdSidenav('ReminderForm').close();
	};

	$scope.CloseModal = function () {
		$mdDialog.hide();
	};

	$http.get(BASE_URL + 'api/products').then(function (Products) {
		$scope.products = Products.data;
	});

	$http.get(BASE_URL + 'api/reminders_by_type/proposal/' + PROPOSALID).then(function (Reminders) {
		$scope.in_reminders = Reminders.data;
		$scope.AddReminder = function () {
			var dataObj = $.param({
				description: $scope.reminder_description,
				date: moment($scope.reminder_date).format("YYYY-MM-DD HH:mm:ss"),
				staff: $scope.reminder_staff,
				relation_type: 'proposal',
				relation: PROPOSALID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/addreminder';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$scope.in_reminders.push({
							'description': $scope.reminder_description,
							'creator': LOGGEDINSTAFFNAME,
							'avatar': UPIMGURL + LOGGEDINSTAFFAVATAR,
							'staff': LOGGEDINSTAFFNAME,
							'date': $scope.reminder_date,
						});
						$mdSidenav('ReminderForm').close();
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.DeleteReminder = function (index) {
			var reminder = $scope.in_reminders[index];
			var dataObj = $.param({
				reminder: reminder.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/removereminder';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.in_reminders.splice($scope.in_reminders.indexOf(reminder), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$http.get(BASE_URL + 'api/notes/proposal/' + PROPOSALID).then(function (Notes) {
		$scope.notes = Notes.data;
		$scope.AddNote = function () {
			var dataObj = $.param({
				description: $scope.note,
				relation_type: 'proposal',
				relation: PROPOSALID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/addnote';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$scope.notes.push({
							'description': $scope.note,
							'staff': LOGGEDINSTAFFNAME,
							'date': new Date(),
						});
						$('.note-description').val('');
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.DeleteNote = function (index) {
			var note = $scope.notes[index];
			var dataObj = $.param({
				notes: note.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/removenote';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.notes.splice($scope.notes.indexOf(note), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});
}

function Orders_Controller($scope, $http, $mdSidenav, $q, $timeout, $filter) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_by_type/' + 'order').then(function (custom_fields) {
		$scope.all_custom_fields = custom_fields.data;
		$scope.custom_fields = $filter('filter')($scope.all_custom_fields, {
			active: 'true',
		});
	});

	$http.get(BASE_URL + 'api/products').then(function (Products) {
		$scope.products = Products.data;
	});

	$http.get(BASE_URL + 'api/leads').then(function (Leads) {
		$scope.leads = Leads.data;
	});


	$scope.GetProduct = (function (search) {
		console.log(search);
		var deferred = $q.defer();
		$timeout(function () {
			deferred.resolve($scope.products);
		}, Math.random() * 500, false);
		return deferred.promise;
	});

	$scope.order = {
		items: [{
			name: 'New',
			product_id: 0,
			code: '',
			description: '',
			quantity: 1,
			unit: 'Unit',
			price: 0,
			tax: 0,
			discount: 0,
		}]
	};

	$scope.add = function () {
		$scope.order.items.push({
			name: 'New',
			product_id: 0,
			code: '',
			description: '',
			quantity: 1,
			unit: 'Unit',
			price: 0,
			tax: 0,
			discount: 0,
		});
	};

	$scope.remove = function (index) {
		$scope.order.items.splice(index, 1);
	};

	$scope.subtotal = function () {
		var subtotal = 0;
		angular.forEach($scope.order.items, function (item) {
			subtotal += item.quantity * item.price;
		});
		return subtotal.toFixed(2);
	};

	$scope.linediscount = function () {
		var linediscount = 0;
		angular.forEach($scope.order.items, function (item) {
			linediscount += ((item.discount) / 100 * item.quantity * item.price);
		});
		return linediscount.toFixed(2);
	};

	$scope.totaltax = function () {
		var totaltax = 0;
		angular.forEach($scope.order.items, function (item) {
			totaltax += ((item.tax) / 100 * item.quantity * item.price);
		});
		return totaltax.toFixed(2);
	};

	$scope.grandtotal = function () {
		var grandtotal = 0;
		angular.forEach($scope.order.items, function (item) {
			grandtotal += item.quantity * item.price + ((item.tax) / 100 * item.quantity * item.price) - ((item.discount) / 100 * item.quantity * item.price);
		});
		return grandtotal.toFixed(2);
	};

	$scope.saveAll = function () {
		var dataObj = $.param({
			customer: $scope.customer,
			lead: $scope.lead,
			comment: $scope.comment,
			subject: $scope.subject,
			content: $scope.content,
			date: moment($scope.created).format("YYYY-MM-DD"),
			created: moment($scope.created).format("YYYY-MM-DD"),
			opentill: moment($scope.opentill).format("YYYY-MM-DD"),
			order_type: $scope.order_type,
			status: $scope.status,
			assigned: $scope.assigned,
			sub_total: $scope.subtotal,
			total_discount: $scope.linediscount,
			total_tax: $scope.totaltax,
			total: $scope.grandtotal,
			items: $scope.order.items,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'orders/create';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					window.location.href = BASE_URL + 'orders/order/' + response.data;
				},
				function (response) {
					console.log(response);
				}
			);
	};


	$http.get(BASE_URL + 'api/orders').then(function (Orders) {
		$scope.orders = Orders.data;
		$scope.search = {
			subject: '',
		};
		// Filter Buttons //
		$scope.toggleFilter = buildToggler('ContentFilter');

		function buildToggler(navID) {
			return function () {
				$mdSidenav(navID).toggle();

			};
		}
		$scope.close = function () {
			$mdSidenav('ContentFilter').close();
		};
		// Filter Buttons //
		// Filtered Datas
		$scope.filter = {};
		$scope.getOptionsFor = function (propName) {
			return ($scope.orders || []).map(function (item) {
				return item[propName];
			}).filter(function (item, idx, arr) {
				return arr.indexOf(item) === idx;
			}).sort();
		};
		$scope.FilteredData = function (item) {
			// Use this snippet for matching with AND
			var matchesAND = true;
			for (var prop in $scope.filter) {
				if (noSubFilter($scope.filter[prop])) {
					continue;
				}
				if (!$scope.filter[prop][item[prop]]) {
					matchesAND = false;
					break;
				}
			}
			return matchesAND;

		};

		function noSubFilter(subFilterObj) {
			for (var key in subFilterObj) {
				if (subFilterObj[key]) {
					return false;
				}
			}
			return true;
		}
		$scope.updateDropdown = function (_prop) {
				var _opt = this.filter_select,
					_optList = this.getOptionsFor(_prop),
					len = _optList.length;

				if (_opt == 'all') {
					for (var j = 0; j < len; j++) {
						$scope.filter[_prop][_optList[j]] = true;
					}
				} else {
					for (var j = 0; j < len; j++) {
						$scope.filter[_prop][_optList[j]] = false;
					}
					$scope.filter[_prop][_opt] = true;
				}
			}
			// Filtered Datas
		$scope.itemsPerPage = 5;
		$scope.currentPage = 0;
		$scope.range = function () {
			var rangeSize = 5;
			var ps = [];
			var start;

			start = $scope.currentPage;
			//  console.log($scope.pageCount(),$scope.currentPage)
			if (start > $scope.pageCount() - rangeSize) {
				start = $scope.pageCount() - rangeSize + 1;
			}

			for (var i = start; i < start + rangeSize; i++) {
				if (i >= 0) {
					ps.push(i);
				}
			}
			return ps;
		};

		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.DisablePrevPage = function () {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
		};

		$scope.DisableNextPage = function () {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};

		$scope.setPage = function (n) {
			$scope.currentPage = n;
		};

		$scope.pageCount = function () {
			return Math.ceil($scope.orders.length / $scope.itemsPerPage) - 1;
		};
	});
}

function Order_Controller($scope, $http, $mdSidenav, $mdDialog, $q, $timeout) {
	"use strict";

	$scope.GeneratePDF = function (ev) {
		$mdDialog.show({
			templateUrl: 'generate-order.html',
			scope: $scope,
			preserveScope: true,
			targetEvent: ev
		});
	};

	$scope.CreatePDF = function () {
		$scope.PDFCreating = true;
		$http.post(BASE_URL + 'orders/create_pdf/' + ORDERID)
			.then(
				function (response) {
					console.log(response);
					if (response.data.status === true) {
						$scope.PDFCreating = false;
						$scope.CreatedPDFName = response.data.file_name;
					}
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$http.get(BASE_URL + 'api/order/' + ORDERID).then(function (OrderDetails) {
		$scope.order = OrderDetails.data;


		$scope.Convert = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Information!')
				.textContent('Do you want to convert this order to invoice?')
				.ariaLabel('Convert')
				.targetEvent(ORDERID)
				.ok('Convert!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var dataObj = $.param({
					total: $scope.ProjectTotalAmount,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'orders/convert_invoice/' + ORDERID, dataObj, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'invoices/update/' + response.data;
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};

		$scope.Update = function () {
			window.location.href = BASE_URL + 'orders/update/' + ORDERID;
		};

		$scope.ViewOrder = function () {
			window.location.href = BASE_URL + 'share/order/' + $scope.order.token;
		};

		$scope.Delete = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title($scope.lang.delete_order)
				.textContent($scope.lang.order_remove_msg)
				.ariaLabel('Delete Order')
				.targetEvent(ORDERID)
				.ok($scope.lang.delete)
				.cancel($scope.lang.cancel);

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'orders/remove/' + ORDERID, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'orders';
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};

		$scope.MarkAs = function (id, name) {
			var dataObj = $.param({
				status_id: id,
				order_id: ORDERID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'orders/markas/';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: '<b>Order marked as' + ' ' + name + '</b>',
							class_name: 'color success'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.subtotal = function () {
			var subtotal = 0;
			angular.forEach($scope.order.items, function (item) {
				subtotal += item.quantity * item.price;
			});
			return subtotal.toFixed(2);
		};
		$scope.linediscount = function () {
			var linediscount = 0;
			angular.forEach($scope.order.items, function (item) {
				linediscount += ((item.discount) / 100 * item.quantity * item.price);
			});
			return linediscount.toFixed(2);
		};
		$scope.totaltax = function () {
			var totaltax = 0;
			angular.forEach($scope.order.items, function (item) {
				totaltax += ((item.tax) / 100 * item.quantity * item.price);
			});
			return totaltax.toFixed(2);
		};
		$scope.grandtotal = function () {
			var grandtotal = 0;
			angular.forEach($scope.order.items, function (item) {
				grandtotal += item.quantity * item.price + ((item.tax) / 100 * item.quantity * item.price) - ((item.discount) / 100 * item.quantity * item.price);
			});
			return grandtotal.toFixed(2);
		};

		$http.get(BASE_URL + 'api/products').then(function (Products) {
			$scope.products = Products.data;
		});

		$http.get(BASE_URL + 'api/leads').then(function (Leads) {
			$scope.leads = Leads.data;
		});

		$scope.GetProduct = (function (search) {
			console.log(search);
			var deferred = $q.defer();
			$timeout(function () {
				deferred.resolve($scope.products);
			}, Math.random() * 500, false);
			return deferred.promise;
		});

		$scope.add = function () {
			$scope.order.items.push({
				name: 'New',
				product_id: 0,
				code: '',
				description: '',
				quantity: 1,
				unit: 'Unit',
				price: 0,
				tax: 0,
				discount: 0,
			});
		};
		$scope.remove = function (index) {
			var item = $scope.order.items[index];
			$http.post(BASE_URL + 'orders/remove_item/' + item.id)
				.then(
					function (response) {
						console.log(response);
						$scope.order.items.splice(index, 1);
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.ProType = $scope.order.order_type;

		$scope.saveAll = function () {
			var dataObj = $.param({
				customer: $scope.order.customer,
				lead: $scope.order.lead,
				comment: $scope.order.comment,
				subject: $scope.order.subject,
				content: $scope.order.content,
				date: moment($scope.order.created).format("YYYY-MM-DD"),
				created: moment($scope.order.created).format("YYYY-MM-DD"),
				opentill: moment($scope.order.opentill).format("YYYY-MM-DD"),
				order_type: $scope.ProType,
				status: $scope.order.status,
				assigned: $scope.order.assigned,
				sub_total: $scope.subtotal,
				total_discount: $scope.linediscount,
				total_tax: $scope.totaltax,
				total: $scope.grandtotal,
				items: $scope.order.items,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'orders/update/' + ORDERID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						window.location.href = BASE_URL + 'orders/order/' + response.data;
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$scope.ReminderForm = buildToggler('ReminderForm');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}
	$scope.close = function () {
		$mdSidenav('ReminderForm').close();
	};

	$scope.CloseModal = function () {
		$mdDialog.hide();
	};

	$http.get(BASE_URL + 'api/products').then(function (Products) {
		$scope.products = Products.data;
	});

	$http.get(BASE_URL + 'api/reminders_by_type/order/' + ORDERID).then(function (Reminders) {
		$scope.in_reminders = Reminders.data;
		$scope.AddReminder = function () {
			var dataObj = $.param({
				description: $scope.reminder_description,
				date: moment($scope.reminder_date).format("YYYY-MM-DD HH:mm:ss"),
				staff: $scope.reminder_staff,
				relation_type: 'order',
				relation: ORDERID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/addreminder';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$scope.in_reminders.push({
							'description': $scope.reminder_description,
							'creator': LOGGEDINSTAFFNAME,
							'avatar': UPIMGURL + LOGGEDINSTAFFAVATAR,
							'staff': LOGGEDINSTAFFNAME,
							'date': $scope.reminder_date,
						});
						$mdSidenav('ReminderForm').close();
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.DeleteReminder = function (index) {
			var reminder = $scope.in_reminders[index];
			var dataObj = $.param({
				reminder: reminder.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/removereminder';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.in_reminders.splice($scope.in_reminders.indexOf(reminder), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$http.get(BASE_URL + 'api/notes/order/' + ORDERID).then(function (Notes) {
		$scope.notes = Notes.data;
		$scope.AddNote = function () {
			var dataObj = $.param({
				description: $scope.note,
				relation_type: 'order',
				relation: ORDERID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/addnote';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$scope.notes.push({
							'description': $scope.note,
							'staff': LOGGEDINSTAFFNAME,
							'date': new Date(),
						});
						$('.note-description').val('');
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.DeleteNote = function (index) {
			var note = $scope.notes[index];
			var dataObj = $.param({
				notes: note.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/removenote';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.notes.splice($scope.notes.indexOf(note), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});
}

function Projects_Controller($scope, $http, $mdSidenav, $filter) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_by_type/' + 'project').then(function (custom_fields) {
		$scope.all_custom_fields = custom_fields.data;
		$scope.custom_fields = $filter('filter')($scope.all_custom_fields, {
			active: 'true',
		});
	});

	$scope.Create = buildToggler('Create');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}
	$scope.close = function () {
		$mdSidenav('Create').close();
	};

	$http.get(BASE_URL + 'api/projects').then(function (Projects) {
		$scope.projects = Projects.data;

		$scope.CreateNew = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				name: $scope.project.name,
				customer: $scope.project.customer,
				description: $scope.project.description,
				start: moment($scope.project.start).format("YYYY-MM-DD"),
				deadline: moment($scope.project.deadline).format("YYYY-MM-DD"),
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'projects/create';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: 'Project Added',
							position: 'bottom',
							class_name: 'color success',
						});
						$scope.projects.push({
							'id': response.data.id,
							'name': response.data.name,
							'status_class': 'notstarted',
							'customer': response.data.customer,
							'status': 'Not Started',
							'status_icon': 'notstarted.png',
							'startdate': response.data.start_date,
							'leftdays': response.data.deadline,
							'progress': 0,
						});
						$mdSidenav('Create').close();
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.pinnedprojects = Projects.data;

		$scope.CheckPinned = function (index) {
			var project = $scope.projects[index];
			var dataObj = $.param({
				project: project.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'projects/checkpinned', dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: 'Project pinned',
							class_name: 'color success'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.UnPinned = function (index) {
			var pinnedproject = $scope.pinnedprojects[index];
			var dataObj = $.param({
				pinnedproject: pinnedproject.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'projects/unpinned';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.pinnedprojects.splice($scope.pinnedprojects.indexOf(pinnedproject), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.itemsPerPage = 6;
		$scope.currentPage = 0;
		$scope.range = function () {
			var rangeSize = 6;
			var ps = [];
			var start;

			start = $scope.currentPage;
			//  console.log($scope.pageCount(),$scope.currentPage)
			if (start > $scope.pageCount() - rangeSize) {
				start = $scope.pageCount() - rangeSize + 1;
			}

			for (var i = start; i < start + rangeSize; i++) {
				if (i >= 0) {
					ps.push(i);
				}
			}
			return ps;
		};
		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};
		$scope.DisablePrevPage = function () {
			return $scope.currentPage === 0 ? "disabled" : "";
		};
		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
		};
		$scope.DisableNextPage = function () {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};
		$scope.setPage = function (n) {
			$scope.currentPage = n;
		};
		$scope.pageCount = function () {
			return Math.ceil($scope.projects.length / $scope.itemsPerPage) - 1;
		};
	});
}

function Project_Controller($scope, $http, $mdSidenav, $mdDialog, $filter) {
	"use strict";

	$scope.NewMilestone = buildToggler('NewMilestone');
	$scope.NewTask = buildToggler('NewTask');
	$scope.NewExpense = buildToggler('NewExpense');
	$scope.Update = buildToggler('Update');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}

	$scope.close = function () {
		$mdSidenav('NewMilestone').close();
		$mdSidenav('NewTask').close();
		$mdSidenav('NewExpense').close();
		$mdSidenav('Update').close();
		$mdDialog.hide();
	};

	$scope.UploadFile = function (ev) {
		$mdDialog.show({
			templateUrl: 'addfile-template.html',
			scope: $scope,
			preserveScope: true,
			targetEvent: ev
		});
	};

	$scope.AddTask = function () {
		if ($scope.isPublic === true) {
			$scope.isPublicValue = 1;
		} else {
			$scope.isPublicValue = 0;
		}
		if ($scope.isBillable === true) {
			$scope.isBillableValue = 1;
		} else {
			$scope.isBillableValue = 0;
		}
		if ($scope.isVisible === true) {
			$scope.isVisibleValue = 1;
		} else {
			$scope.isVisibleValue = 0;
		}
		var dataObj = $.param({
			name: $scope.newtask.name,
			hourlyrate: $scope.newtask.hourlyrate,
			assigned: $scope.newtask.assigned,
			priority: $scope.newtask.priority,
			milestone: $scope.newtask.milestone,
			public: $scope.isPublicValue,
			billable: $scope.isBillableValue,
			visible: $scope.isVisibleValue,
			startdate: moment($scope.newtask.startdate).format("YYYY-MM-DD"),
			duedate: moment($scope.newtask.duedate).format("YYYY-MM-DD"),
			description: $scope.newtask.description,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'projects/addtask/' + PROJECTID;
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					$mdSidenav('NewTask').close();
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$http.get(BASE_URL + 'api/custom_fields_data_by_type/' + 'project/' + PROJECTID).then(function (custom_fields) {
		$scope.custom_fields = custom_fields.data;
	});

	$http.get(BASE_URL + 'api/project/' + PROJECTID).then(function (Project) {
		$scope.project = Project.data;

		$scope.AddProjectMember = function () {
			var dataObj = $.param({
				staff: $scope.insertedStaff,
				project: PROJECTID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'projects/addmember';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdDialog.hide();
						$scope.project.members.push({
							'id': response.data.staffavatar,
							'staffname': response.data.staffname,
							'staffavatar': response.data.staffavatar,
							'email': response.data.email,
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.AddExpense = function () {
			var dataObj = $.param({
				title: $scope.newexpense.title,
				amount: $scope.newexpense.amount,
				date: moment($scope.newexpense.date).format("YYYY-MM-DD"),
				category: $scope.newexpense.category,
				account: $scope.newexpense.account,
				description: $scope.newexpense.description,
				customer: $scope.project.customer_id,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'projects/addexpense/' + PROJECTID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('NewExpense').close();
						window.location.href = BASE_URL + 'expenses/receipt/' + response.data;
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.UpdateProject = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				name: $scope.project.name,
				customer: $scope.project.customer_id,
				description: $scope.project.description,
				start: moment($scope.project.start).format("YYYY-MM-DD"),
				deadline: moment($scope.project.deadline).format("YYYY-MM-DD"),
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'projects/update/' + PROJECTID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('Update').close();
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							position: 'bottom',
							class_name: 'color success',
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.projectmembers = $scope.project.members;
		$scope.UnlinkMember = function (index) {
			var link = $scope.projectmembers[index];
			var linkid = link.id;
			var dataObj = $.param({
				linkid: linkid
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'projects/unlinkmember/' + linkid, dataObj, config)
				.then(
					function (response) {
						$scope.projectmembers.splice($scope.projectmembers.indexOf(link), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.DeleteFile = function (index) {
			var file = $scope.files[index];
			var dataObj = $.param({
				fileid: file.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'projects/deletefile';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.files.splice($scope.files.indexOf(file), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$http.get(BASE_URL + 'api/projecttimelogs/' + PROJECTID).then(function (TimeLogs) {
			$scope.timelogs = TimeLogs.data;
			$scope.getTotal = function () {
				var TotalTime = 0;
				for (var i = 0; i < $scope.timelogs.length; i++) {
					var timelog = $scope.timelogs[i];
					TotalTime += (timelog.timed);
				}
				return TotalTime;
			};
			$scope.ProjectTotalAmount = function () {
				var TotalAmount = 0;
				for (var i = 0; i < $scope.timelogs.length; i++) {
					var timelog = $scope.timelogs[i];
					TotalAmount += (timelog.amount);
				}
				return TotalAmount;
			};
		});

		$scope.InsertMember = function (ev) {
			$mdDialog.show({
				templateUrl: 'insert-member-template.html',
				scope: $scope,
				preserveScope: true,
				targetEvent: ev
			});
		};

		$scope.Convert = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Information!')
				.textContent('Do you want to convert this project to invoice?')
				.ariaLabel('Convert')
				.targetEvent(PROJECTID)
				.ok('Convert!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var dataObj = $.param({
					total: $scope.ProjectTotalAmount,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'projects/convert/' + PROJECTID, dataObj, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'invoices/update/' + response.data;
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};

		$scope.Delete = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Attention!')
				.textContent('Do you confirm the deletion of all data belonging to this project?')
				.ariaLabel('Delete Project')
				.targetEvent(PROJECTID)
				.ok('Do it!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'projects/remove/' + PROJECTID, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'projects';
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};

	});

	$scope.MarkAs = function (id, name) {
		var dataObj = $.param({
			status_id: id,
			project_id: PROJECTID,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'projects/markas/';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: '<b>Project marked as' + ' ' + name + '</b>',
						class_name: 'color success'
					});
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$http.get(BASE_URL + 'api/projectmilestones/' + PROJECTID).then(function (Milestones) {
		$scope.milestones = Milestones.data;

		$scope.AddMilestone = function () {
			var dataObj = $.param({
				order: $scope.milestone.order,
				name: $scope.milestone.name,
				description: $scope.milestone.description,
				duedate: moment($scope.milestone.duedate).format("YYYY-MM-DD HH:mm:ss"),
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'projects/addmilestone/' + PROJECTID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$scope.milestones.push({
							'order': $scope.milestone.order,
							'name': $scope.milestone.name,
							'duedate': $scope.milestone.duedate,
						});
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: 'Milestone added',
							position: 'bottom',
							class_name: 'color success',
						});
						$mdSidenav('NewMilestone').close();
						$scope.milestone.order = '';
						$scope.milestone.name = '';
						$scope.milestone.description = '';
						$scope.milestone.duedate = '';
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.ShowMilestone = function (index) {
			var milestone = $scope.milestones[index];
			$mdDialog.show({
				contentElement: '#ShowMilestone-' + milestone.id,
				parent: angular.element(document.body),
				targetEvent: index,
				clickOutsideToClose: true
			});
		};

		$scope.UpdateMilestone = function (index) {
			var milestone = $scope.milestones[index];
			var milestone_id = milestone.id;
			$scope.milestone = milestone;
			var dataObj = $.param({
				order: $scope.milestone.order,
				name: $scope.milestone.name,
				description: $scope.milestone.description,
				duedate: moment($scope.milestone.duedate).format("YYYY-MM-DD HH:mm:ss"),
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'projects/updatemilestone/' + milestone_id;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdDialog.hide();
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.RemoveMilestone = function (index) {
			var milestone = $scope.milestones[index];
			var dataObj = $.param({
				milestone: milestone.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'projects/removemilestone';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.milestones.splice($scope.milestones.indexOf(milestone), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};

	});

	$http.get(BASE_URL + 'api/reminders_by_type/project/' + PROJECTID).then(function (Reminders) {
		$scope.in_reminders = Reminders.data;
	});

	$http.get(BASE_URL + 'api/notes/project/' + PROJECTID).then(function (Notes) {
		$scope.notes = Notes.data;
		$scope.AddNote = function () {
			var dataObj = $.param({
				description: $scope.note,
				relation_type: 'project',
				relation: PROJECTID,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/addnote';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.notes.push({
							'description': $scope.note,
							'staff': LOGGEDINSTAFFNAME,
							'date': new Date(),
						});
						$('.note-description').val('');
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.DeleteNote = function (index) {
			var note = $scope.notes[index];
			var dataObj = $.param({
				notes: note.id
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'trivia/removenote';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						$scope.notes.splice($scope.notes.indexOf(note), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$http.get(BASE_URL + 'api/expenses_by_relation/project/' + PROJECTID).then(function (Expenses) {
		$scope.expenses = Expenses.data;
		$scope.TotalExpenses = function () {
			return $scope.expenses.reduce(function (total, expense) {
				return total + (expense.amount * 1 || 0);
			}, 0);
		};

		$scope.billedexpenses = $filter('filter')($scope.expenses, {
			billstatus_code: "true"
		});
		$scope.BilledExpensesTotal = function () {
			return $scope.billedexpenses.reduce(function (total, expense) {
				return total + (expense.amount * 1 || 0);
			}, 0);
		};

		$scope.unbilledexpenses = $filter('filter')($scope.expenses, {
			billstatus_code: "false"
		});
		$scope.UnBilledExpensesTotal = function () {
			return $scope.unbilledexpenses.reduce(function (total, expense) {
				return total + (expense.amount * 1 || 0);
			}, 0);
		};

	});

	$http.get(BASE_URL + 'api/projectfiles/' + PROJECTID).then(function (Files) {
		$scope.files = Files.data;
	});

	$http.get(BASE_URL + 'api/accounts').then(function (Accounts) {
		$scope.accounts = Accounts.data;
	});

	$http.get(BASE_URL + 'api/expensescategories').then(function (Epxensescategories) {
		$scope.expensescategories = Epxensescategories.data;
	});

}

function Tickets_Controller($scope, $http, $mdSidenav) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_by_type/' + 'ticket').then(function (custom_fields) {
		$scope.all_custom_fields = custom_fields.data;
		$scope.custom_fields = $filter('filter')($scope.all_custom_fields, {
			active: 'true',
		});
	});

	$scope.Create = buildToggler('Create');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}

	$scope.close = function () {
		$mdSidenav('Create').close();
	};

	$http.get(BASE_URL + 'api/tickets').then(function (Tickets) {
		$scope.tickets = Tickets.data;
		$scope.GoTicket = function (TICKETID) {
			window.location.href = BASE_URL + 'tickets/ticket/' + TICKETID;
		};
		$scope.search = {
			subject: '',
			message: ''
		};
	});

	$http.get(BASE_URL + 'api/customers').then(function (Customers) {
		$scope.customers = Customers.data;
	});

	$http.get(BASE_URL + 'api/contacts').then(function (Contacts) {
		$scope.contacts = Contacts.data;
	});
}

function Ticket_Controller($scope, $http, $mdDialog) {
	"use strict";

	$scope.close = function () {
		$mdDialog.hide();
	};

	$scope.AssigneStaff = function (ev) {
		$mdDialog.show({
			templateUrl: 'insert-member-template.html',
			scope: $scope,
			preserveScope: true,
			targetEvent: ev
		});
	};

	$http.get(BASE_URL + 'api/ticket/' + TICKETID).then(function (TicketDetails) {
		$scope.ticket = TicketDetails.data;
		$scope.AssignStaff = function () {
			var dataObj = $.param({
				staff: $scope.AssignedStaff,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'tickets/assign_staff/' + TICKETID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdDialog.hide();
						$scope.ticket.assigned_staff_name = response.data;
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.Reply = function () {
			var dataObj = $.param({
				message: $scope.reply.message,
				attachment: $scope.reply.attachment,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'tickets/reply/' + TICKETID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$scope.ticket.replies.push({
							'message': $scope.reply.message,
							'name': LOGGEDINSTAFFNAME,
							'date': new Date(),
							'attachment': $scope.reply.attachment,
						});
						$scope.reply.attachment = '';
						$scope.reply.message = '';
					},
					function (response) {
						console.log(response);
					}
				);
		};
		$scope.Delete = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Attention!')
				.textContent('Do you confirm the deletion of all data belonging to this ticket?')
				.ariaLabel('Delete Ticket')
				.targetEvent(TICKETID)
				.ok('Do it!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'tickets/remove/' + TICKETID, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'tickets';
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};
	});

	$scope.MarkAs = function (id, name) {
		var dataObj = $.param({
			status_id: id,
			ticket_id: TICKETID,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'tickets/markas/';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: '<b>Ticket marked as' + ' ' + name + '</b>',
						class_name: 'color success'
					});
				},
				function (response) {
					console.log(response);
				}
			);
	};

}

function Products_Controller($scope, $http, $mdSidenav, $filter) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_by_type/' + 'product').then(function (custom_fields) {
		$scope.all_custom_fields = custom_fields.data;
		$scope.custom_fields = $filter('filter')($scope.all_custom_fields, {
			active: 'true',
		});
	});

	$scope.Create = buildToggler('Create');
	$scope.toggleFilter = buildToggler('ContentFilter');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();
		};
	}

	$scope.close = function () {
		$mdSidenav('Create').close();
	};

	$http.get(BASE_URL + 'api/products').then(function (Products) {
		$scope.products = Products.data;

		$scope.AddProduct = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				name: $scope.product.productname,
				purchaseprice: $scope.product.purchase_price,
				saleprice: $scope.product.sale_price,
				code: $scope.product.code,
				tax: $scope.product.vat,
				stock: $scope.product.stock,
				description: $scope.product.description,
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'products/create/';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('Create').close();
						window.location.href = BASE_URL + 'products/product/' + response.data;
					},
					function (response) {
						console.log(response);
					}
				);
		};


		$scope.itemsPerPage = 5;
		$scope.currentPage = 0;
		$scope.range = function () {
			var rangeSize = 5;
			var ps = [];
			var start;

			start = $scope.currentPage;
			//  console.log($scope.pageCount(),$scope.currentPage)
			if (start > $scope.pageCount() - rangeSize) {
				start = $scope.pageCount() - rangeSize + 1;
			}

			for (var i = start; i < start + rangeSize; i++) {
				if (i >= 0) {
					ps.push(i);
				}
			}
			return ps;
		};

		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.DisablePrevPage = function () {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pageCount()) {
				$scope.currentPage++;
			}
		};

		$scope.DisableNextPage = function () {
			return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
		};

		$scope.setPage = function (n) {
			$scope.currentPage = n;
		};

		$scope.pageCount = function () {
			return Math.ceil($scope.products.length / $scope.itemsPerPage) - 1;
		};
	});
}

function Product_Controller($scope, $http, $mdSidenav, $mdDialog) {
	"use strict";

	$scope.Update = buildToggler('Update');
	$scope.toggleFilter = buildToggler('ContentFilter');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();
		};
	}

	$scope.close = function () {
		$mdSidenav('Update').close();
	};

	$http.get(BASE_URL + 'api/custom_fields_data_by_type/' + 'product/' + PRODUCTID).then(function (custom_fields) {
		$scope.custom_fields = custom_fields.data;
	});

	$http.get(BASE_URL + 'api/product/' + PRODUCTID).then(function (Product) {
		$scope.product = Product.data;
		$scope.UpdateProduct = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				name: $scope.product.productname,
				purchaseprice: $scope.product.purchase_price,
				saleprice: $scope.product.sale_price,
				code: $scope.product.code,
				tax: $scope.product.vat,
				stock: $scope.product.stock,
				description: $scope.product.description,
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'products/update/' + PRODUCTID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$mdSidenav('Update').close();
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color success'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.Delete = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Attention!')
				.textContent('Do you confirm the deletion of all data belonging to this product?')
				.ariaLabel('Delete Product')
				.targetEvent(PRODUCTID)
				.ok('Do it!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'products/remove/' + PRODUCTID, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'products';
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};

	});
}

function Settings_Controller($scope, $http, $mdDialog, $mdSidenav) {
	"use strict";

	$scope.close = function () {
		$mdDialog.hide();
		$mdSidenav('CreateCustomField').close();
		$mdSidenav('FieldDetail').close();
	};

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}

	$http.get(BASE_URL + 'api/languages').then(function (Languages) {
		$scope.languages = Languages.data;
	});

	$http.get(BASE_URL + 'api/currencies').then(function (Currencies) {
		$scope.currencies = Currencies.data;
	});

	$http.get(BASE_URL + 'api/countries').then(function (Countries) {
		$scope.countries = Countries.data;
	});

	$http.get(BASE_URL + 'api/timezones').then(function (Timezones) {
		$scope.timezones = Timezones.data;
	});

	$http.get(BASE_URL + 'api/accounts').then(function (Accounts) {
		$scope.accounts = Accounts.data;
	});

	$scope.ChangeLogo = function (ev) {
		$mdDialog.show({
			templateUrl: 'logo-template.html',
			scope: $scope,
			preserveScope: true,
			targetEvent: ev
		});
	};

	$scope.VersionCheck = function (ev) {
		$mdDialog.show({
			templateUrl: 'version-check-template.html',
			scope: $scope,
			preserveScope: true,
			targetEvent: ev
		});
	};

	$http.get(BASE_URL + 'api/settings_detail').then(function (Settings) {
		$scope.settings_detail = Settings.data;

		if ($scope.settings_detail.pushState === '1') {
			$scope.settings_detail.pushState = true;
		} else {
			$scope.settings_detail.pushState = false;
		}
		if ($scope.settings_detail.two_factor_authentication === '1') {
			$scope.settings_detail.two_factor_authentication = true;
		} else {
			$scope.settings_detail.two_factor_authentication = false;
		}
		if ($scope.settings_detail.voicenotification === '1') {
			$scope.settings_detail.voicenotification = true;
		} else {
			$scope.settings_detail.voicenotification = false;
		}
		if ($scope.settings_detail.paypalenable === '1') {
			$scope.settings_detail.paypalenable = true;
		} else {
			$scope.settings_detail.paypalenable = false;
		}
		if ($scope.settings_detail.paypalsandbox === '1') {
			$scope.settings_detail.paypalsandbox = true;
		} else {
			$scope.settings_detail.paypalsandbox = false;
		}
		if ($scope.settings_detail.authorize_enable === '1') {
			$scope.settings_detail.authorize_enable = true;
		} else {
			$scope.settings_detail.authorize_enable = false;
		}
		$scope.UpdateSettings = function () {
			var dataObj = $.param({
				crm_name: $scope.settings_detail.crm_name,
				company: $scope.settings_detail.company,
				email: $scope.settings_detail.email,
				address: $scope.settings_detail.address,
				city: $scope.settings_detail.city,
				town: $scope.settings_detail.town,
				state: $scope.settings_detail.state,
				country_id: $scope.settings_detail.country_id,
				zipcode: $scope.settings_detail.zipcode,
				phone: $scope.settings_detail.phone,
				fax: $scope.settings_detail.fax,
				vatnumber: $scope.settings_detail.vatnumber,
				taxoffice: $scope.settings_detail.taxoffice,
				currencyid: $scope.settings_detail.currencyid,
				termtitle: $scope.settings_detail.termtitle,
				termdescription: $scope.settings_detail.termdescription,
				dateformat: $scope.settings_detail.dateformat,
				languageid: $scope.settings_detail.languageid,
				default_timezone: $scope.settings_detail.default_timezone,
				smtphost: $scope.settings_detail.smtphost,
				smtpport: $scope.settings_detail.smtpport,
				emailcharset: $scope.settings_detail.emailcharset,
				email_encryption: $scope.settings_detail.email_encryption,
				smtpusername: $scope.settings_detail.smtpusername,
				smtppassoword: $scope.settings_detail.smtppassoword,
				sendermail: $scope.settings_detail.sendermail,
				accepted_files_formats: $scope.settings_detail.accepted_files_formats,
				allowed_ip_adresses: $scope.settings_detail.allowed_ip_adresses,
				pushState: $scope.settings_detail.pushState,
				voicenotification: $scope.settings_detail.voicenotification,
				paypalenable: $scope.settings_detail.paypalenable,
				authorize_enable: $scope.settings_detail.authorize_enable,
				paypalemail: $scope.settings_detail.paypalemail,
				paypalsandbox: $scope.settings_detail.paypalsandbox,
				paypalcurrency: $scope.settings_detail.paypalcurrency,
				authorize_login_id: $scope.settings_detail.authorize_login_id,
				authorize_transaction_key: $scope.settings_detail.authorize_transaction_key,
				two_factor_authentication: $scope.settings_detail.two_factor_authentication,
				authorize_record_account: $scope.settings_detail.authorize_record_account,
				paypal_record_account: $scope.settings_detail.paypal_record_account,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'settings/update/ciuis';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color success'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$http.get(BASE_URL + 'api/custom_fields/').then(function (custom_fields) {
		$scope.custom_fields = custom_fields.data;
	});

	$scope.CreateCustomField = buildToggler('CreateCustomField');

	$scope.GetFieldDetail = function (id) {
		$http.get(BASE_URL + 'api/custom_field_data_by_id/' + id).then(function (selected_field) {
			$scope.selected_field = selected_field.data;

			$scope.AddOptionToField = function () {
				$scope.selected_field.data.push({
					name: $scope.selected_field.new_option_name,
				});
				for (var i = 0; i < $scope.selected_field.data.length; i++) {
					$scope.selected_field.data[i].id = i;
				}
				$scope.selected_field.new_option_name = null;
			};

			$scope.RemoveFieldOption = function (index) {
				$scope.selected_field.data.splice(index, 1);
			};

			$scope.UpdateCustomField = function () {
				if ($scope.selected_field.type === 'select') {
					$scope.field_data = JSON.stringify($scope.selected_field.data);
				} else {
					$scope.field_data = null;
				}
				var dataObj = $.param({
					name: $scope.selected_field.name,
					type: $scope.selected_field.type,
					order: $scope.selected_field.order,
					data: $scope.field_data,
					relation: $scope.selected_field.relation,
					icon: '',
					permission: $scope.selected_field.permission

				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				var posturl = BASE_URL + 'settings/update_custom_field/' + $scope.selected_field.id;
				$http.post(posturl, dataObj, config)
					.then(
						function (response) {
							console.log(response);
							$mdSidenav('FieldDetail').close();
							$.gritter.add({
								title: '<b>' + NTFTITLE + '</b>',
								text: response.data,
								class_name: 'color success'
							});
						},
						function (response) {
							console.log(response);
						}
					);
			};
		});
	};

	$scope.RemoveCustomField = function (index) {
		var field = $scope.custom_fields[index];
		var confirm = $mdDialog.confirm()
			.title($scope.lang.remove_custom_field)
			.textContent($scope.lang.custom_field_remove_msg)
			.ariaLabel('Delete Custom Field')
			.targetEvent(field.id)
			.ok($scope.lang.delete)
			.cancel($scope.lang.cancel);

		$mdDialog.show(confirm).then(function () {
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'settings/remove_custom_field/' + field.id, config)
				.then(
					function (response) {
						console.log(response);
						$scope.custom_fields.splice(index, 1);
					},
					function (response) {
						console.log(response);
					}
				);

		}, function () {
			//
		});
	};

	$scope.FieldDetail = buildToggler('FieldDetail');

	$scope.select_options = [];

	$scope.new_custom_field = {
		permission: false,
		new_option_name: ''
	};

	$scope.AddOption = function () {
		$scope.select_options.push({
			name: $scope.new_custom_field.new_option_name,
		});
		for (var i = 0; i < $scope.select_options.length; i++) {
			$scope.select_options[i].id = i;
		}
		$scope.new_custom_field.new_option_name = null;
	};

	$scope.RemoveOption = function (index) {
		$scope.select_options.splice(index, 1);
	};

	$scope.AddCustomField = function () {
		if ($scope.new_custom_field.type === 'select') {
			$scope.field_data = JSON.stringify($scope.select_options);
		} else {
			$scope.field_data = null;
		}
		var dataObj = $.param({
			name: $scope.new_custom_field.name,
			type: $scope.new_custom_field.type,
			order: $scope.new_custom_field.order,
			data: $scope.field_data,
			relation: $scope.new_custom_field.relation,
			icon: '',
			permission: $scope.new_custom_field.permission,
			active: 'true'

		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var posturl = BASE_URL + 'settings/create_custom_field/';
		$http.post(posturl, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					$mdSidenav('CreateCustomField').close();
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: response.data,
						class_name: 'color success'
					});
					$scope.new_custom_field = [];
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.UpdateCustomFieldStatus = function (id, value) {
		$http.post(BASE_URL + 'settings/update_custom_field_status/' + id + '/' + value + '/')
			.then(
				function (response) {
					console.log(response);
				},
				function (response) {
					console.log(response);
				}
			);
	};

	$scope.custom_fields_types = [{
		'id': '1',
		'type': 'input',
		'name': 'Input'
	}, {
		'id': '2',
		'type': 'date',
		'name': 'Date Picker'
	}, {
		'id': '3',
		'type': 'textarea',
		'name': 'Text Area'
	}, {
		'id': '4',
		'type': 'select',
		'name': 'Select'
	}];

	$scope.custom_fields_relation_types = [{
		'id': '1',
		'relation': 'invoice',
		'name': 'Invoice'
	}, {
		'id': '2',
		'relation': 'proposal',
		'name': 'Proposal'
	}, {
		'id': '3',
		'relation': 'customer',
		'name': 'Customer'
	}, {
		'id': '4',
		'relation': 'task',
		'name': 'Task'
	}, {
		'id': '5',
		'relation': 'project',
		'name': 'Project'
	}, {
		'id': '6',
		'relation': 'ticket',
		'name': 'Ticket'
	}, {
		'id': '7',
		'relation': 'expense',
		'name': 'Expense'
	}, {
		'id': '8',
		'relation': 'product',
		'name': 'Product'
	}, {
		'id': '9',
		'relation': 'lead',
		'name': 'Lead'
	}];



}

function Staffs_Controller($scope, $http, $mdSidenav, $mdDialog, $filter) {
	"use strict";

	$http.get(BASE_URL + 'api/custom_fields_by_type/' + 'staff').then(function (custom_fields) {
		$scope.all_custom_fields = custom_fields.data;
		$scope.custom_fields = $filter('filter')($scope.all_custom_fields, {
			active: 'true',
		});
	});

	$scope.Create = buildToggler('Create');

	$scope.ViewStaff = function (staff_id) {
		window.location.href = BASE_URL + 'staff/staffmember/' + staff_id;
	};

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}

	$scope.close = function () {
		$mdSidenav('Create').close();
		$mdDialog.hide();
	};

	$http.get(BASE_URL + 'api/departments').then(function (Departments) {
		$scope.departments = Departments.data;

		$scope.NewDepartment = function () {
			var confirm = $mdDialog.prompt()
				.title('New Department')
				.textContent('Please type department name')
				.placeholder('Department Name')
				.ariaLabel('Department Name')
				.initialValue('')
				.required(true)
				.ok('Add!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function (result) {
				var dataObj = $.param({
					name: result,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'staff/add_department/', dataObj, config)
					.then(
						function (response) {
							console.log(response);
							$scope.departments.push({
								'id': response.data,
								'name': result,
							});
						},
						function (response) {
							console.log(response);
						}
					);
			}, function () {

			});
		};

		$scope.EditDepartment = function (index) {
			var department = $scope.departments[index];
			var confirm = $mdDialog.prompt()
				.title('Update Department')
				.textContent('Please type new department name.')
				.placeholder('Department name')
				.ariaLabel('Department Name')
				.initialValue(department.name)
				.targetEvent(event)
				.required(true)
				.ok('Save')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function (result) {
				var dataObj = $.param({
					name: result,
				});
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'staff/update_department/' + department.id, dataObj, config)
					.then(
						function () {
							department.name = result;
						},
						function () {
							//UNSUCCESS
						}
					);
			}, function () {
				//Cancel
			});
		};

		$scope.DeleteDepartment = function (index) {
			var department = $scope.departments[index];
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'staff/remove_department/' + department.id, config)
				.then(
					function (response) {
						$scope.departments.splice($scope.departments.indexOf(department), 1);
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});

	$http.get(BASE_URL + 'api/languages').then(function (Languages) {
		$scope.languages = Languages.data;
	});

	$http.get(BASE_URL + 'api/staff/').then(function (Staff) {
		$scope.staff = Staff.data;
		$scope.staff.active = true;
		$scope.staff.admin = false;
		$scope.staff.staffmember = false;
		$scope.AddStaff = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				name: $scope.staff.name,
				email: $scope.staff.email,
				phone: $scope.staff.phone,
				department: $scope.staff.department_id,
				language: $scope.staff.language,
				address: $scope.staff.address,
				admin: $scope.staff.admin,
				staffmember: $scope.staff.staffmember,
				inactive: $scope.staff.active,
				password: $scope.passwordNew,
				birthday: moment($scope.staff.birthday).format("YYYY-MM-DD"),
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'staff/create/';
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color success'
						});
						$mdSidenav('Create').close();
					},
					function (response) {
						console.log(response);
					}
				);
		};
	});
}

function Staff_Controller($scope, $http, $mdSidenav, $mdDialog, $filter) {
	"use strict";

	$scope.Update = buildToggler('Update');
	$scope.Privileges = buildToggler('Privileges');

	function buildToggler(navID) {
		return function () {
			$mdSidenav(navID).toggle();

		};
	}

	$scope.close = function () {
		$mdSidenav('Update').close();
		$mdSidenav('Privileges').close();
		$mdDialog.hide();
	};

	$scope.ChangeAvatar = function (ev) {
		$mdDialog.show({
			templateUrl: 'change-avatar-template.html',
			scope: $scope,
			preserveScope: true,
			targetEvent: ev
		});
	};

	$scope.GoogleCalendar = function (ev) {
		$mdDialog.show({
			templateUrl: 'google-calendar-template.html',
			scope: $scope,
			preserveScope: true,
			targetEvent: ev
		});
	};

	$scope.ChangePassword = function () {
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = $mdDialog.prompt()
			.title('Change Password')
			.textContent('Are sure change staff password?')
			.placeholder('Password')
			.ariaLabel('Password')
			.initialValue('')
			.targetEvent(STAFFID)
			.required(true)
			.ok('Okay!')
			.cancel('Cancel');

		$mdDialog.show(confirm).then(function (result) {
			var dataObj = $.param({
				password: result,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			$http.post(BASE_URL + 'staff/changestaffpassword/' + STAFFID, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color warning'
						});

					},
					function (response) {
						console.log(response);
					}
				);
		}, function () {

		});
	};

	$scope.UpdateGoogleCalendar = function () {
		if ($scope.staff.google_calendar_enable === true) {
			$scope.Enable = 1;
		} else {
			$scope.Enable = 0;
		}
		var dataObj = $.param({
			google_calendar_id: $scope.staff.google_calendar_id,
			google_calendar_api_key: $scope.staff.google_calendar_api_key,
			google_calendar_enable: $scope.Enable,
		});
		var config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		$http.post(BASE_URL + 'staff/update_google_calendar/' + STAFFID, dataObj, config)
			.then(
				function (response) {
					console.log(response);
					$.gritter.add({
						title: '<b>' + NTFTITLE + '</b>',
						text: response.data.message,
						class_name: response.data.color,
					});
					$mdDialog.hide();

				},
				function (response) {
					console.log(response);
				}
			);
	};

	$http.get(BASE_URL + 'api/departments').then(function (Departments) {
		$scope.departments = Departments.data;
	});
	$http.get(BASE_URL + 'api/languages').then(function (Languages) {
		$scope.languages = Languages.data;
	});

	$http.get(BASE_URL + 'api/invoices').then(function (Invoices) {
		$scope.all_invoices = Invoices.data;
		$scope.invoices = $filter('filter')($scope.all_invoices, {
			staff_id: STAFFID,
		});
	});

	$scope.GoInvoice = function (index) {
		var invoice = $scope.invoices[index];
		window.location.href = BASE_URL + 'invoices/invoice/' + invoice.id;
	};

	$http.get(BASE_URL + 'api/proposals').then(function (Proposals) {
		$scope.all_proposals = Proposals.data;
		$scope.proposals = $filter('filter')($scope.all_proposals, {
			assigned: STAFFID,
		});
	});

	$scope.GoProposal = function (index) {
		var proposal = $scope.proposals[index];
		window.location.href = BASE_URL + 'proposals/proposal/' + proposal.id;
	};

	$http.get(BASE_URL + 'api/tickets').then(function (Tickets) {
		$scope.all_tickets = Tickets.data;
		$scope.tickets = $filter('filter')($scope.all_tickets, {
			staff_id: STAFFID,
		});
	});

	$scope.GoTicket = function (index) {
		var ticket = $scope.tickets[index];
		window.location.href = BASE_URL + 'tickets/ticket/' + ticket.id;
	};

	$http.get(BASE_URL + 'api/custom_fields_data_by_type/' + 'staff/' + STAFFID).then(function (custom_fields) {
		$scope.custom_fields = custom_fields.data;
	});


	$http.get(BASE_URL + 'api/staff_detail/' + STAFFID).then(function (StaffDetail) {
		$scope.staff = StaffDetail.data;

		$scope.UpdateWorkPlan = function () {
			var dataObj = $.param({
				work_plan: JSON.stringify($scope.staff.work_plan)
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'staff/update_workplan/' + STAFFID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color success'
						});
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.UpdateStaff = function () {
			$scope.tempArr = [];
			angular.forEach($scope.custom_fields, function (value) {
				if (value.type === 'input') {
					$scope.field_data = value.data;
				}
				if (value.type === 'textarea') {
					$scope.field_data = value.data;
				}
				if (value.type === 'date') {
					$scope.field_data = moment(value.data).format("YYYY-MM-DD");
				}
				if (value.type === 'select') {
					$scope.field_data = JSON.stringify(value.selected_opt);
				}
				$scope.tempArr.push({
					id: value.id,
					name: value.name,
					type: value.type,
					order: value.order,
					data: $scope.field_data,
					relation: value.relation,
					permission: value.permission,
				});
			});
			var dataObj = $.param({
				name: $scope.staff.name,
				email: $scope.staff.email,
				phone: $scope.staff.phone,
				department: $scope.staff.department_id,
				language: $scope.staff.language,
				address: $scope.staff.address,
				admin: $scope.staff.admin,
				staffmember: $scope.staff.staffmember,
				inactive: $scope.staff.active,
				birthday: moment($scope.staff.birthday).format("YYYY-MM-DD"),
				custom_fields: $scope.tempArr,
			});
			var config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var posturl = BASE_URL + 'staff/update/' + STAFFID;
			$http.post(posturl, dataObj, config)
				.then(
					function (response) {
						console.log(response);
						$.gritter.add({
							title: '<b>' + NTFTITLE + '</b>',
							text: response.data,
							class_name: 'color success'
						});
						$mdSidenav('Update').close();
					},
					function (response) {
						console.log(response);
					}
				);
		};

		$scope.Delete = function () {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Attention!')
				.textContent('Do you confirm the deletion of all data belonging to this staff?')
				.ariaLabel('Delete Staff')
				.targetEvent(STAFFID)
				.ok('Do it!')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function () {
				var config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				$http.post(BASE_URL + 'staff/remove/' + STAFFID, config)
					.then(
						function (response) {
							console.log(response);
							window.location.href = BASE_URL + 'staff';
						},
						function (response) {
							console.log(response);
						}
					);

			}, function () {
				//
			});
		};

		$scope.UpdatePrivileges = function (id, value, privilege_id) {
			$http.post(BASE_URL + 'staff/update_privilege/' + id + '/' + value + '/' + privilege_id)
				.then(
					function (response) {
						console.log(response);
					},
					function (response) {
						console.log(response);
					}
				);
		};

		var canvas = document.getElementById("staff_sales_chart");
		var multiply = {
			beforeDatasetsDraw: function (chart, options, el) {
				chart.ctx.globalCompositeOperation = 'multiply';
			},
			afterDatasetsDraw: function (chart, options) {
				chart.ctx.globalCompositeOperation = 'source-over';
			},
		};
		var gradientThisWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
		gradientThisWeek.addColorStop(0, '#ffbc00');
		gradientThisWeek.addColorStop(1, '#fff');
		var gradientPrevWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
		gradientPrevWeek.addColorStop(0, '#616f8c');
		gradientPrevWeek.addColorStop(1, '#fff');
		var config = {
			type: 'bar',
			data: $scope.staff.properties.chart_data,
			options: {
				elements: {
					point: {
						radius: 0,
						hitRadius: 5,
						hoverRadius: 5
					}
				},
				legend: {
					display: false,
				},
				scales: {
					xAxes: [{
						display: false,
					}],
					yAxes: [{
						display: false,
						ticks: {
							beginAtZero: true,
						},
					}]
				},
				legend: {
					display: true
				}
			},
			plugins: [multiply],
		};
		window.chart = new Chart(canvas, config);
	});
}

function Reports_Controller($scope, $http) {
	"use strict";

	$http.get(BASE_URL + 'api/stats').then(function (Stats) {
		$scope.stats = Stats.data;

		new Chart($('#invoice_chart_by_status'), {
			type: 'horizontalBar',
			data: $scope.stats.invoice_chart_by_status,
			options: {
				legend: {
					display: false,
				},
				responsive: true
			}
		});

		new Chart($('#leads_to_win_by_leadsource'), {
			type: 'horizontalBar',
			data: $scope.stats.leads_to_win_by_leadsource,
			options: {
				legend: {
					display: false,
				}
			}
		});

		new Chart($('#leads_by_leadsource'), {
			type: 'horizontalBar',
			data: $scope.stats.leads_by_leadsource,
			options: {
				legend: {
					display: false,
				}
			}
		});

		new Chart($('#incomingsvsoutgoins'), {
			type: 'bar',
			data: $scope.stats.incomings_vs_outgoins,
			options: {
				legend: {
					display: false,
				}
			}
		});

		new Chart($('#expensesbycategories'), {
			type: 'bar',
			data: $scope.stats.expenses_by_categories,
			options: {
				legend: {
					display: false,
				}
			}
		});

		new Chart($('#top_selling_staff_chart'), {
			type: 'line',
			data: $scope.stats.top_selling_staff_chart,
			options: {
				legend: {
					display: false,
				}
			}
		});

		var CustomerGraph;
		$.get(BASE_URL + 'report/customer_monthly_increase_chart/' + $scope.CustomerReportMonth, function (response) {
			var ctx = $('#customergraph_ciuis-xe').get(0).getContext('2d');
			CustomerGraph = new Chart(ctx, {
				'type': 'bar',
				data: response,
				options: {
					responsive: true
				},
			});
		}, 'json');

		$scope.CustomerMonthChanged = function () {
			lead_graph.destroy();
			$.get(BASE_URL + 'report/customer_monthly_increase_chart/' + $scope.CustomerReportMonth, function (response) {
				var ctx = $('#customergraph_ciuis-xe').get(0).getContext('2d');
				CustomerGraph = new Chart(ctx, {
					'type': 'bar',
					data: response,
					options: {
						responsive: true
					},
				});
			}, 'json');
		};

		var lead_graph;
		$.get(BASE_URL + 'report/lead_graph/' + $scope.LeadReportMonth, function (response) {
			var ctx = $('#lead_graph').get(0).getContext('2d');
			lead_graph = new Chart(ctx, {
				'type': 'bar',
				data: response,
				options: {
					responsive: true
				},
			});
		}, 'json');


		$scope.LeadMonthChanged = function () {
			lead_graph.destroy();
			$.get(BASE_URL + 'report/lead_graph/' + $scope.LeadReportMonth, function (response) {
				var ctx = $('#lead_graph').get(0).getContext('2d');
				lead_graph = new Chart(ctx, {
					'type': 'bar',
					data: response,
					options: {
						responsive: true
					},
				});
			}, 'json');
		};

	});

}

function Calendar_Controller($scope, $http, $mdDialog, $filter) {
	"use strict";

	$scope.close = function () {
		$mdDialog.hide();
	};

	$http.get(BASE_URL + 'api/events').then(function (Events) {
		$scope.all_events = Events.data;
		$scope.today_events = $filter('filter')($scope.all_events, {
			date: $scope.curDate,
		});
	});


	$http.get(BASE_URL + 'api/appointments').then(function (appointments) {
		$scope.all_appointments = appointments.data;
		$scope.today_appointments = $filter('filter')($scope.all_appointments, {
			date: $scope.curDate,
			status: 1,
		});
	});

	$http.get(BASE_URL + 'api/appointments').then(function (appointments) {
		$scope.all_appointments = appointments.data;
		$scope.requested_appointments = $filter('filter')($scope.all_appointments, {
			status: 0,
		});
	});

	$http.get(BASE_URL + 'api/appointments').then(function (appointments) {
		$scope.appointments = appointments.data;
	});

	$scope.ShowAppointment = function (index) {
		var appointment = $scope.appointments[index];
		$mdDialog.show({
			contentElement: '#Appointment-' + appointment.id,
			parent: angular.element(document.body),
			targetEvent: index,
			clickOutsideToClose: true
		});
	};

	$scope.ConfirmAppointment = function (id) {
		var posturl = BASE_URL + 'appointments/confirm_appointment/' + id;
		$http.post(posturl)
			.then(
				function (response) {
					console.log(response);
					$mdDialog.hide();
				},
				function (response) {
					console.log(response);
				}
			);
	};
	$scope.DeclineAppointment = function (id) {
		var posturl = BASE_URL + 'appointments/decline_appointment/' + id;
		$http.post(posturl)
			.then(
				function (response) {
					console.log(response);
					$mdDialog.hide();
				},
				function (response) {
					console.log(response);
				}
			);
	};
	$scope.MarkAsDoneAppointment = function (id) {
		var posturl = BASE_URL + 'appointments/mark_as_done_appointment/' + id;
		$http.post(posturl)
			.then(
				function (response) {
					console.log(response);
					$mdDialog.hide();
				},
				function (response) {
					console.log(response);
				}
			);
	};

}

function Appointments_Controller($scope, $http, $mdDialog, $filter, $timeout) {
	"use strict";

	$scope.events = [];
	$scope.navigatorConfig = {
		selectMode: "day",
		showMonths: 3,
		skipMonths: 3,
		onTimeRangeSelected: function (args) {
			$scope.weekConfig.startDate = args.day;
			$scope.dayConfig.startDate = args.day;
			loadEvents();
		}
	};
	$scope.dayConfig = {
		viewType: "Day",
		onTimeRangeSelected: function (args) {
			var params = {
				start: args.start.toString(),
				end: args.end.toString(),
				text: "New event"
			};

			$http.post("backend_create.php", params).success(function (data) {
				$scope.events.push({
					start: args.start,
					end: args.end,
					text: "New event",
					id: data.id
				});
			});
		},
		onEventMove: function (args) {
			var params = {
				id: args.e.id(),
				newStart: args.newStart.toString(),
				newEnd: args.newEnd.toString()
			};

			$http.post("backend_move.php", params);
		},
		onEventResize: function (args) {
			var params = {
				id: args.e.id(),
				newStart: args.newStart.toString(),
				newEnd: args.newEnd.toString()
			};

			$http.post("backend_move.php", params);
		},
		onEventClick: function (args) {
			$mdDialog.show({
				contentElement: '#Appointment-' + args.e.id(),
				parent: angular.element(document.body),
				targetEvent: args.e.id(),
				clickOutsideToClose: true
			});
		}
	};
	$scope.weekConfig = {
		visible: false,
		viewType: "Week",
		onTimeRangeSelected: function (args) {
			var params = {
				start: args.start.toString(),
				end: args.end.toString(),
				text: "New event"
			};

			$http.post("backend_create.php", params).success(function (data) {
				$scope.events.push({
					start: args.start,
					end: args.end,
					text: "New event",
					id: data.id
				});
			});
		},
		onEventMove: function (args) {
			var params = {
				id: args.e.id(),
				newStart: args.newStart.toString(),
				newEnd: args.newEnd.toString()
			};

			$http.post("backend_move.php", params);
		},
		onEventResize: function (args) {
			var params = {
				id: args.e.id(),
				newStart: args.newStart.toString(),
				newEnd: args.newEnd.toString()
			};

			$http.post("backend_move.php", params);
		},
		onEventClick: function (args) {
			$mdDialog.show({
				contentElement: '#Appointment-' + args.e.id(),
				parent: angular.element(document.body),
				targetEvent: args.e.id(),
				clickOutsideToClose: true
			});
		}
	};
	$scope.showDay = function () {
		$scope.dayConfig.visible = true;
		$scope.weekConfig.visible = false;
		$scope.navigatorConfig.selectMode = "day";
	};
	$scope.showWeek = function () {
		$scope.dayConfig.visible = false;
		$scope.weekConfig.visible = true;
		$scope.navigatorConfig.selectMode = "week";
	};
	loadEvents();

	function loadEvents() {
		// using $timeout to make sure all changes are applied before reading visibleStart() and visibleEnd()
		$timeout(function () {
			var params = {
				start: $scope.week.visibleStart().toString(),
				end: $scope.week.visibleEnd().toString()
			};
			$http.get(BASE_URL + 'api/all_appointments').then(function (appointments) {
				$scope.events = appointments.data;
			});
		});
	}

	$scope.close = function () {
		$mdDialog.hide();
	};

	$http.get(BASE_URL + 'api/appointments').then(function (appointments) {
		$scope.all_appointments = appointments.data;
		$scope.today_appointments = $filter('filter')($scope.all_appointments, {
			date: $scope.curDate,
			status: 1,
		});
	});

	$http.get(BASE_URL + 'api/appointments').then(function (appointments) {
		$scope.all_appointments = appointments.data;
		$scope.requested_appointments = $filter('filter')($scope.all_appointments, {
			status: 0,
		});
	});

	$http.get(BASE_URL + 'api/appointments').then(function (appointments) {
		$scope.appointments = appointments.data;
	});

	$scope.ShowAppointment = function (id) {
		$mdDialog.show({
			contentElement: '#Appointment-' + id,
			parent: angular.element(document.body),
			targetEvent: id,
			clickOutsideToClose: true
		});
	};

	$scope.ConfirmAppointment = function (id) {
		var posturl = BASE_URL + 'appointments/confirm_appointment/' + id;
		$http.post(posturl)
			.then(
				function (response) {
					console.log(response);
					$mdDialog.hide();
				},
				function (response) {
					console.log(response);
				}
			);
	};
	$scope.DeclineAppointment = function (id) {
		var posturl = BASE_URL + 'appointments/decline_appointment/' + id;
		$http.post(posturl)
			.then(
				function (response) {
					console.log(response);
					$mdDialog.hide();
				},
				function (response) {
					console.log(response);
				}
			);
	};
	$scope.MarkAsDoneAppointment = function (id) {
		var posturl = BASE_URL + 'appointments/mark_as_done_appointment/' + id;
		$http.post(posturl)
			.then(
				function (response) {
					console.log(response);
					$mdDialog.hide();
				},
				function (response) {
					console.log(response);
				}
			);
	};

}

function Chart_Controller($scope, $http) {
	"use strict";

	$http.get(BASE_URL + 'api/stats').then(function (Stats) {
		$scope.stats = Stats.data;

		Highcharts.setOptions({
			colors: ['#ffbc00', 'rgb(239, 89, 80)']
		});

		Highcharts.chart('monthlyexpenses', {
			title: {
				text: '',
			},
			credits: {
				enabled: false
			},
			chart: {
				backgroundColor: 'transparent',
				marginBottom: 0,
				marginLeft: -10,
				marginRight: -10,
				marginTop: 0,
				type: 'area',
			},
			exporting: {
				enabled: false
			},
			plotOptions: {
				series: {
					fillOpacity: 0.1
				},
				area: {
					lineWidth: 1,
					marker: {
						lineWidth: 2,
						symbol: 'circle',
						fillColor: 'black',
						radius: 3,
					},
					legend: {
						radius: 2,
					}
				}
			},
			xAxis: {
				categories: $scope.stats.months,
				visible: true,
			},
			yAxis: {
				title: {
					enabled: false
				},
				visible: false
			},
			tooltip: {
				shadow: false,
				useHTML: true,
				padding: 0,
				formatter: function () {
					return '<div class="bis-tooltip" style="background-color: ' + this.color + '">' + this.x + ' <span>' + this.y + ' ' + $scope.cur_symbol + '</span></div>'
				}
			},
			legend: {
				align: 'right',
				enabled: false,
				verticalAlign: 'top',
				layout: 'vertical',
				x: -15,
				y: 100,
				itemMarginBottom: 20,
				useHTML: true,
				labelFormatter: function () {
					return '<span style="color:' + this.color + '">' + this.name + '</span>'
				},
				symbolPadding: 0,
				symbolWidth: 0,
				symbolRadius: 0
			},
			series: [{
				"data": $scope.stats.monthly_expenses,
			}]
		}, function (chart) {
			var series = chart.series;
			series.forEach(function (serie) {
				if (serie.legendSymbol) {
					serie.legendSymbol.destroy();
				}
				if (serie.legendLine) {
					serie.legendLine.destroy();
				}
			});
		});

		var MainChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				xAxes: [{
					categoryPercentage: .2,
					barPercentage: 1,
					position: 'top',
					gridLines: {
						color: '#C7CBD5',
						zeroLineColor: '#C7CBD5',
						drawTicks: true,
						borderDash: [8, 5],
						offsetGridLines: false,
						tickMarkLength: 10,
						callback: function (value) {

						}
					},
					ticks: {
						callback: function (value) {
							return value.charAt(0) + value.charAt(1) + value.charAt(2);
						}
					}
				}],
				yAxes: [{
					display: false,
					gridLines: {
						drawBorder: false,
						drawOnChartArea: false,
						borderDash: [8, 5],
						offsetGridLines: false
					},
					ticks: {
						beginAtZero: true,
						maxTicksLimit: 5,
					}
				}]
			},
			legend: {
				display: false
			}
		};
		var ctx = $('#main-chart');
		var mainChart = new Chart(ctx, {
			type: 'bar',
			data: $scope.stats.weekly_sales_chart,
			borderRadius: 10,
			options: MainChartOptions
		});

	});

}

function Login_Controller() {
	"use strict";
}

CiuisCRM.controller('Ciuis_Controller', Ciuis_Controller);
CiuisCRM.controller('Leads_Controller', Leads_Controller);
CiuisCRM.controller('Lead_Controller', Lead_Controller);
CiuisCRM.controller('Accounts_Controller', Accounts_Controller);
CiuisCRM.controller('Account_Controller', Account_Controller);
CiuisCRM.controller('Customers_Controller', Customers_Controller);
CiuisCRM.controller('Customer_Controller', Customer_Controller);
CiuisCRM.controller('Tasks_Controller', Tasks_Controller);
CiuisCRM.controller('Task_Controller', Task_Controller);
CiuisCRM.controller('Expenses_Controller', Expenses_Controller);
CiuisCRM.controller('Expense_Controller', Expense_Controller);
CiuisCRM.controller('Invoices_Controller', Invoices_Controller);
CiuisCRM.controller('Invoice_Controller', Invoice_Controller);
CiuisCRM.controller('Proposals_Controller', Proposals_Controller);
CiuisCRM.controller('Proposal_Controller', Proposal_Controller);
CiuisCRM.controller('Orders_Controller', Orders_Controller);
CiuisCRM.controller('Order_Controller', Order_Controller);
CiuisCRM.controller('Projects_Controller', Projects_Controller);
CiuisCRM.controller('Project_Controller', Project_Controller);
CiuisCRM.controller('Tickets_Controller', Tickets_Controller);
CiuisCRM.controller('Ticket_Controller', Ticket_Controller);
CiuisCRM.controller('Products_Controller', Products_Controller);
CiuisCRM.controller('Product_Controller', Product_Controller);
CiuisCRM.controller('Settings_Controller', Settings_Controller);
CiuisCRM.controller('Staffs_Controller', Staffs_Controller);
CiuisCRM.controller('Staff_Controller', Staff_Controller);
CiuisCRM.controller('Reports_Controller', Reports_Controller);
CiuisCRM.controller('Calendar_Controller', Calendar_Controller);
CiuisCRM.controller('Appointments_Controller', Appointments_Controller);
CiuisCRM.controller('Chart_Controller', Chart_Controller);
CiuisCRM.controller('Login_Controller', Login_Controller);

// ALL FILTERS

CiuisCRM.filter('trustAsHtml', ['$sce', function ($sce) {
	"use strict";

	return function (text) {
		return $sce.trustAsHtml(text);
	};
}]);

CiuisCRM.filter('pagination', function () {
	"use strict";

	return function (input, start) {
		if (!input || !input.length) {
			return;
		}
		start = +start; //parse to int
		return input.slice(start);
	};
});

CiuisCRM.filter('time', function () {
	"use strict";

	var conversions = {
		'ss': angular.identity,
		'mm': function (value) {
			return value * 60;
		},
		'hh': function (value) {
			return value * 3600;
		}
	};

	var padding = function (value, length) {
		var zeroes = length - ('' + (value)).length,
			pad = '';
		while (zeroes-- > 0) pad += '0';
		return pad + value;
	};

	return function (value, unit, format, isPadded) {
		var totalSeconds = conversions[unit || 'ss'](value),
			hh = Math.floor(totalSeconds / 3600),
			mm = Math.floor((totalSeconds % 3600) / 60),
			ss = totalSeconds % 60;

		format = format || 'hh:mm:ss';
		isPadded = angular.isDefined(isPadded) ? isPadded : true;
		hh = isPadded ? padding(hh, 2) : hh;
		mm = isPadded ? padding(mm, 2) : mm;
		ss = isPadded ? padding(ss, 2) : ss;

		return format.replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
	};
});

// ALL DIRECTIVES

CiuisCRM.directive('loadMore', function () {
	"use strict";

	return {
		template: "<a ng-click='loadMore()' id='loadButton' class='activity_tumu'><i style='font-size:22px;' class='icon ion-android-arrow-down'></i></a>",
		link: function (scope) {
			scope.LogLimit = 2;
			scope.loadMore = function () {
				scope.LogLimit += 5;
				if (scope.logs.length < scope.LogLimit) {
					CiuisCRM.element(loadButton).fadeOut();
				}
			};
		}
	};
});

CiuisCRM.directive("bindExpression", function ($parse) {
	"use strict";
	var directive = {};
	directive.restrict = 'E';
	directive.require = 'ngModel';
	directive.link = function (scope, element, attrs, ngModel) {
		scope.$watch(attrs.expression, function (newValue) {
			ngModel.$setViewValue(newValue);
		});
		ngModel.$render = function () {
			$parse(attrs.expression).assign(ngModel.viewValue);
		};
	};
	return directive;
});

CiuisCRM.directive('onErrorSrc', function () {
	"use strict";

	return {
		link: function (scope, element, attrs) {
			element.bind('error', function () {
				if (attrs.src !== attrs.onErrorSrc) {
					attrs.$set('src', attrs.onErrorSrc);
				}
			});
		}
	};
});

CiuisCRM.directive('ciuisReady', function () {
	"use strict";
	return {
		link: function ($scope) {
			setTimeout(function () {
				$scope.$apply(function () {
					var milestone_projectExpandablemilestonetitle = $('.milestone_project-action.is-expandable .milestonetitle');
					$(milestone_projectExpandablemilestonetitle).attr('tabindex', '0');
					// Give milestone_projects ID's
					$('.milestone_project').each(function (i, $milestone_project) {
						var $milestone_projectActions = $($milestone_project).find('.milestone_project-action.is-expandable');
						$($milestone_projectActions).each(function (j, $milestone_projectAction) {
							var $milestoneContent = $($milestone_projectAction).find('.content');
							$($milestoneContent).attr('id', 'milestone_project-' + i + '-milestone-content-' + j).attr('role', 'region');
							$($milestoneContent).attr('aria-expanded', $($milestone_projectAction).hasClass('expanded'));
							$($milestone_projectAction).find('.milestonetitle').attr('aria-controls', 'milestone_project-' + i + '-milestone-content-' + j);
						});
					});
					$(milestone_projectExpandablemilestonetitle).click(function () {
						$(this).parent().toggleClass('is-expanded');
						$(this).siblings('.content').attr('aria-expanded', $(this).parent().hasClass('is-expanded'));
					});
					// Expand or navigate back and forth between sections
					$(milestone_projectExpandablemilestonetitle).keyup(function (e) {
						if (e.which === 13) { //Enter key pressed
							$(this).click();
						} else if (e.which === 37 || e.which === 38) { // Left or Up
							$(this).closest('.milestone_project-milestone').prev('.milestone_project-milestone').find('.milestone_project-action .milestonetitle').focus();
						} else if (e.which === 39 || e.which === 40) { // Right or Down
							$(this).closest('.milestone_project-milestone').next('.milestone_project-milestone').find('.milestone_project-action .milestonetitle').focus();
						}
					});
				});
			}, 5000);
			angular.element(document).ready(function () {
				$('.transform_logo').addClass('animated rotateIn'); // Logo Transform
				$('#chooseFile').bind('change', function () {
					var filename = $("#chooseFile").val();
					if (/^\s*$/.test(filename)) {
						$(".file-upload").removeClass('active');
						$("#noFile").text("None Chosen");
					} else {
						$(".file-upload").addClass('active');
						$("#noFile").text(filename.replace("C:\\fakepath\\", ""));
					}
				});
				var $btns = $('.pbtn').click(function () {
					if (this.id == 'all') {
						$('#ciuisprojectcard > div').fadeIn(450);
					} else {
						var $el = $('.' + this.id).fadeIn(450);
						$('#ciuisprojectcard > div').not($el).hide();
					}
					$btns.removeClass('active');
					$(this).addClass('active');
				});

				$('.add-file-cover').hide();

				$(document).on('click', function (e) {
					if ($(e.target).closest('.add-file').length) {
						$(".add-file-cover").show();
					} else if (!$(e.target).closest('.add-file-cover').length) {
						$('.add-file-cover').hide();
					}
				});
				$('.form-field-file').each(function () {
					var label = $('label', this);
					var labelValue = $(label).html();
					var fileInput = $('input[type="file"]', this);
					$(fileInput).on('change', function () {
						var fileName = $(this).val().split('\\').pop();
						if (fileName) {
							$(label).html(fileName);
						} else {
							$(label).html(labelValue);
						}
					});
				});
				$(document).ready(function () {
					$('input[name=type]').change(function () {
						if (!$(this).is(':checked')) {
							return;
						}
						if ($(this).val() === '0') {
							$('.bank').hide();
						} else if ($(this).val() === '1') {
							$('.bank').show();
						}
					});
				});
				$('#ciuisloader').hide();
			});
		}
	};
});
CiuisCRM.directive("strToTime", function () {
	"use strict";
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ngModelController) {
			ngModelController.$parsers.push(function (data) {
				if (!data) {
					return "";
				}
				return ("0" + data.getHours().toString()).slice(-2) + ":" + ("0" + data.getMinutes().toString()).slice(-2);
			});
			ngModelController.$formatters.push(function (data) {
				if (!data) {
					return null;
				}
				var d = new Date(1970, 1, 1);
				var splitted = data.split(":");
				d.setHours(splitted[0]);
				d.setMinutes(splitted[1]);
				return d;
			});
		}
	};
});
CiuisCRM.directive('ciuisSidebar', function () {
	"use strict";
	return {
		templateUrl: "ciuis-sidebar.html"
	};
});
CiuisCRM.directive('customFieldsVertical', function () {
	"use strict";
	return {
		templateUrl: "custom-fields.html"
	};
});
CiuisCRM.directive("uiDraggable", [
	'$parse',
	'$rootScope',
	function ($parse, $rootScope) {
		"use strict";
		return function (scope, element, attrs) {
			if ($.jQuery && !$.jQuery.event.props.dataTransfer) {
				$.jQuery.event.props.push('dataTransfer');
			}
			element.attr("draggable", false);
			attrs.$observe("uiDraggable", function (newValue) {
				element.attr("draggable", newValue);
			});
			var dragData = "";
			scope.$watch(attrs.drag, function (newValue) {
				dragData = newValue;
			});
			element.bind("dragstart", function (e) {
				var sendData = angular.toJson(dragData);
				var sendChannel = attrs.dragChannel || "defaultchannel";
				e.dataTransfer.setData("Text", sendData);
				$rootScope.$broadcast("ANGULAR_DRAG_START", sendChannel);

			});

			element.bind("dragend", function (e) {
				var sendChannel = attrs.dragChannel || "defaultchannel";
				$rootScope.$broadcast("ANGULAR_DRAG_END", sendChannel);
				if (e.dataTransfer && e.dataTransfer.dropEffect !== "none") {
					if (attrs.onDropSuccess) {
						var fn = $parse(attrs.onDropSuccess);
						scope.$apply(function () {
							fn(scope, {
								$event: e
							});
						});
					}
				}
			});


		};
	}
]);
CiuisCRM.directive("uiOnDrop", [
	'$parse',
	'$rootScope',
	function ($parse, $rootScope) {
		"use strict";
		return function (scope, element, attr) {
			var dropChannel = "defaultchannel";
			var dragChannel = "";
			var dragEnterClass = attr.dragEnterClass || "on-drag-enter";
			var dragHoverClass = attr.dragHoverClass || "on-drag-hover";

			function onDragOver(e) {

				if (e.preventDefault) {
					e.preventDefault(); // Necessary. Allows us to drop.
				}

				if (e.stopPropagation) {
					e.stopPropagation();
				}
				e.dataTransfer.dropEffect = 'move';
				return false;
			}

			function onDragEnter(e) {
				$rootScope.$broadcast("ANGULAR_HOVER", dropChannel);
				element.addClass(dragHoverClass);
			}

			function onDrop(e) {
				if (e.preventDefault) {
					e.preventDefault(); // Necessary. Allows us to drop.
				}
				if (e.stopPropagation) {
					e.stopPropagation(); // Necessary. Allows us to drop.
				}
				var data = e.dataTransfer.getData("Text");
				data = angular.fromJson(data);
				var fn = $parse(attr.uiOnDrop);
				scope.$apply(function () {
					fn(scope, {
						$data: data,
						$event: e
					});
				});
				element.removeClass(dragEnterClass);
			}


			$rootScope.$on("ANGULAR_DRAG_START", function (event, channel) {
				dragChannel = channel;
				if (dropChannel === channel) {

					element.bind("dragover", onDragOver);
					element.bind("dragenter", onDragEnter);

					element.bind("drop", onDrop);
					element.addClass(dragEnterClass);
				}

			});

			$rootScope.$on("ANGULAR_DRAG_END", function (e, channel) {
				dragChannel = "";
				if (dropChannel === channel) {

					element.unbind("dragover", onDragOver);
					element.unbind("dragenter", onDragEnter);

					element.unbind("drop", onDrop);
					element.removeClass(dragHoverClass);
					element.removeClass(dragEnterClass);
				}
			});

			$rootScope.$on("ANGULAR_HOVER", function (e, channel) {
				if (dropChannel === channel) {
					element.removeClass(dragHoverClass);
				}
			});

			attr.$observe('dropChannel', function (value) {
				if (value) {
					dropChannel = value;
				}
			});


		};
	}
]);