<!DOCTYPE html>
<html ng-app="Ciuis" lang="<?php echo lang('lang_code');?>">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="With Ciuis CRM you can easily manage your customer relationships and save time on your business.">
<link rel="shortcut icon" href="<?php echo base_url('assets/img/logo-fav.png'); ?>">
<title><?php echo $title; ?></title>
<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
<script src="<?php echo base_url('assets/lib/angular/angular.min.js'); ?>"></script>
<script src="<?php echo base_url('assets/lib/angular/angular-animate.min.js'); ?>"></script>
<script src="<?php echo base_url('assets/lib/angular/angular-aria.min.js'); ?>"></script>
<script src="<?php echo base_url('assets/lib/angular/i18n/angular-locale_'.lang('lang_code_dash').'.js'); ?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/ciuis.css'); ?>" type="text/css"/>
<script>var BASE_URL = "<?php echo base_url(); ?>",ACTIVESTAFF = "<?php echo $this->session->userdata('usr_id'); ?>",SHOW_ONLY_ADMIN = "<?php if (!if_admin) {echo 'true';} else echo 'false';?>",CURRENCY = "<?php echo currency ?>",LOCATE_SELECTED = "<?php echo lang('lang_code');?>",UPIMGURL = "<?php echo base_url('uploads/images/'); ?>",NTFTITLE = "<?php echo lang('notification')?>",INVMARKCACELLED = "<?php echo lang('invoicecancelled')?>",TICKSTATUSCHANGE = "<?php echo lang('ticketstatuschanced')?>",LEADMARKEDAS = "<?php echo lang('leadmarkedas')?>",LEADUNMARKEDAS = "<?php echo lang('leadunmarkedas')?>",TODAYDATE = "<?php echo date('Y.m.d ')?>",LOGGEDINSTAFFID = "<?php echo $this->session->userdata('usr_id'); ?>",LOGGEDINSTAFFNAME = "<?php echo $this->session->userdata('staffname'); ?>",LOGGEDINSTAFFAVATAR = "<?php echo $this->session->userdata('staffavatar'); ?>",VOICENOTIFICATIONLANG = "<?php echo lang('lang_code_dash');?>",initialLocaleCode = "<?php echo lang('initial_locale_code');?>";</script>
</head>
<?php $settings = $this->Settings_Model->get_settings_ciuis(); ?>
<body ng-controller="Ciuis_Controller">
<div id="ciuisloader"></div>
<md-toolbar class="toolbar-ciuis-top">
  <div class="md-toolbar-tools"> 
    <!-- CRM NAME -->
    <div md-truncate class="crm-name"><span ng-bind="settings.crm_name"></span></div>
    <md-button ng-click="OpenMenu()" class="md-icon-button hidden-lg hidden-md" aria-label="Menu">
      <md-tooltip md-direction="left" ng-bind='lang.menu'></md-tooltip>
      <md-icon><i class="ion-navicon-round text-muted"></i></md-icon>
    </md-button>
    <!-- CRM NAME --> 
    <!-- NAVBAR MENU -->
    <ul flex class="ciuis-v3-menu hidden-xs">
      <li ng-repeat="nav in navbar  | orderBy:'order_id'"><a href="{{nav.url}}" ng-bind="nav.name"></a>
        <ul ng-show="nav.sub_menu.length">
          <li ng-repeat="submenu in nav.sub_menu | orderBy:'order_id'"><a ng-href="{{submenu.url}}"> <i class="icon {{submenu.icon}}"></i> <span class="title" ng-bind="submenu.name"></span> <span class="descr" ng-bind="submenu.description"></span> </a></li>
        </ul>
      </li>
    </ul>
    <!-- NAVBAR MENU -->
    <md-button ng-hide="ONLYADMIN != 'true'" class="md-icon-button" ng-href="{{appurl + 'settings'}}" aria-label="Settings">
      <md-tooltip md-direction="left" ng-bind='lang.settings'></md-tooltip>
      <md-icon><i class="ion-gear-a text-muted"></i></md-icon>
    </md-button>
    <md-button ng-click="Todo()" class="md-icon-button" aria-label="Todo">
      <md-tooltip md-direction="left" ng-bind='lang.todo'></md-tooltip>
      <md-icon><i class="ion-clipboard text-muted"></i></md-icon>
    </md-button>
    <md-button ng-click="Notifications()" class="md-icon-button" aria-label="Notifications">
      <md-tooltip md-direction="left" ng-bind='lang.notifications'></md-tooltip>
      <div ng-show="stats.newnotification == true" class="notify"> <span class="heartbit"></span> <span class="point"></span> </div>
      <md-icon><i class="ion-ios-bell text-muted"></i></md-icon>
    </md-button>
    <md-button ng-click="Profile()" class="md-icon-button avatar-button-ciuis" aria-label="User Profile"> <img height="100%" ng-src="<?php echo base_url('uploads/images/{{user.avatar}}')?>" class="md-avatar" alt="{{user.name}}" /> </md-button>
    <div ng-click="Profile()" md-truncate class="user-informations hidden-xs"> <span class="user-name-in" ng-bind="user.name"></span><br>
      <span class="user-email-in"><?php echo $this->session->userdata('email'); ?></span> </div>
  </div>
</md-toolbar>
<md-content id="mobile-menu" class="" style="left: 0px; opacity: 1; display: none">
  <md-toolbar class="toolbar-white">
    <div class="md-toolbar-tools">
      <div flex md-truncate class="crm-name"><span ng-bind="settings.crm_name"></span></div>
      <md-button ng-click="close()" class="md-icon-button" aria-label="Close">
        <md-icon><i class="ion-close-circled text-muted"></i></md-icon>
      </md-button>
    </div>
  </md-toolbar>
  <md-content class="mobile-menu-box bg-white">
    <div class="mobile-menu-wrapper-inner">
      <div class="mobile-menu-wrapper">
        <div class="mobile-menu-slider" style="left: 0px;">
          <div class="mobile-menu">
            <ul>
              <li ng-repeat="menu in menu" class="nav-item" ng-if="menu.show_staff == '0'">
                <div class="mobile-menu-item"><a href="{{menu.url}}" ng-bind="menu.title"></a></div>
              </li>
            </ul>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </md-content>
</md-content>
<header id="mainHeader" role="banner" class="hidden-xs">
  <nav role="navigation">
    <div class="top-header">
      <div class="navBurger"><a href="{{appurl + 'panel'}}"><img class="transform_logo" width="34px" height="34px" ng-src="{{appurl + 'uploads/ciuis_settings/' + applogo}}"></a></div>
    </div>
    <ul id="menu-vertical-menu icon" class="nav">
      <li ng-repeat="menu in menu" class="material-icons {{menu.icon}}" ng-if="menu.show_staff == '0'"><a href="{{menu.url}}">{{menu.title}}</a></li>
      <li class="material-icons ico-ciuis-tasks"><a href="{{appurl + 'tasks'}}" ng-bind='lang.tasks'></a></li>
      <li ng-repeat="pinned in projects | limitTo:1" class="profile-util" style="z-index: 1; padding: 10px; width: 100%; height: 65px; margin-bottom: 0px; display: flex; border-top: 1px solid rgba(0,0,0,0.87);">
        <div class="chart">
          <div class="donut">
            <desc>
              <progress max="100" value="{{pinned.progress}}"></progress>
            </desc>
          </div>
        </div>
        <a class="nav_pinned_project" href="{{appurl + 'projects/project/' + pinned.id}}" ng-bind="pinned.name"></a></li>
    </ul>
  </nav>
</header>
<md-sidenav class="md-sidenav-left md-whiteframe-4dp" md-component-id="PickUpTo"></md-sidenav>
<md-sidenav class="md-sidenav-right md-whiteframe-4dp" md-component-id="SetOnsiteVisit">
  <md-toolbar class="md-theme-light" style="background:#262626">
    <div class="md-toolbar-tools">
      <md-button ng-click="close()" class="md-icon-button" aria-label="Close"> <i class="ion-android-arrow-forward"></i></md-button>
      <md-truncate ng-bind='lang.set_onsite_visit'></md-truncate>
    </div>
  </md-toolbar>
  <md-content layout-padding="">
    <md-content layout-padding>
      <md-input-container class="md-block">
        <label ng-bind='lang.title'></label>
        <input ng-model="onsite_visit.title">
      </md-input-container>
      <md-input-container class="md-block" flex-gt-xs>
        <label ng-bind='lang.customer'></label>
        <md-select required placeholder="{{lang.choisecustomer}}" ng-model="onsite_visit.customer_id" style="min-width: 200px;" aria-label='Customer'>
          <md-option ng-value="customer.id" ng-repeat="customer in all_customers">{{customer.name}}</md-option>
        </md-select>
      </md-input-container>
      <md-input-container class="md-block">
        <label ng-bind='lang.assigned'></label>
        <md-select placeholder="{{lang.choosestaff}}" ng-model="onsite_visit.staff_id" style="min-width: 200px;" aria-label='Staff'>
          <md-option ng-value="staff.id" ng-repeat="staff in staff">{{staff.name}}</md-option>
        </md-select>
      </md-input-container>
      <br>
      <md-input-container class="md-block">
        <label ng-bind='lang.start'></label>
        <input mdc-datetime-picker="" date="true" time="true" type="text" id="datetime" placeholder="{{lang.chooseadate}}" show-todays-date="" minutes="true" min-date="date" show-icon="true" ng-model="onsite_visit.start" class=" dtp-no-msclear dtp-input md-input">
      </md-input-container>
      <md-input-container class="md-block">
        <label ng-bind='lang.end'></label>
        <input mdc-datetime-picker="" date="true" time="true" type="text" id="datetime" placeholder="{{lang.chooseadate}}" show-todays-date="" minutes="true" min-date="date" show-icon="true" ng-model="onsite_visit.end" class=" dtp-no-msclear dtp-input md-input">
      </md-input-container>
      <md-input-container class="md-block">
        <label ng-bind='lang.description'></label>
        <textarea required ng-model="onsite_visit.description" placeholder="Type something" class="form-control note-description"></textarea>
      </md-input-container>
      <div class="pull-right">
        <md-button ng-click="AddOnsiteVisit()" ng-bind='lang.set' aria-label='Add Onsite Visit'></md-button>
      </div>
    </md-content>
  </md-content>
</md-sidenav>
<md-sidenav class="md-sidenav-right md-whiteframe-4dp" md-component-id="EventForm">
  <md-toolbar class="md-theme-light" style="background:#262626">
    <div class="md-toolbar-tools">
      <md-button ng-click="close()" class="md-icon-button" aria-label="Close"> <i class="ion-android-arrow-forward"></i> </md-button>
      <md-truncate ng-bind='lang.addevent'></md-truncate>
    </div>
  </md-toolbar>
  <md-content layout-padding="">
    <md-content layout-padding>
      <md-input-container class="md-block">
        <label ng-bind='lang.title'></label>
        <input ng-model="event_title">
      </md-input-container>
      <md-input-container class="md-block">
        <label ng-bind='lang.start'></label>
        <input mdc-datetime-picker="" date="true" time="true" type="text" id="datetime" placeholder="{{lang.chooseadate}}" show-todays-date="" minutes="true" min-date="date" show-icon="true" ng-model="event_start" class=" dtp-no-msclear dtp-input md-input">
      </md-input-container>
      <md-input-container class="md-block">
        <label ng-bind='lang.end'></label>
        <input mdc-datetime-picker="" date="true" time="true" type="text" id="datetime" placeholder="{{lang.chooseadate}}" show-todays-date="" minutes="true" min-date="date" show-icon="true" ng-model="event_end" class=" dtp-no-msclear dtp-input md-input">
      </md-input-container>
      <md-input-container class="md-block">
        <label ng-bind='lang.description'></label>
        <textarea required name="detail" ng-model="event_detail" placeholder="Type something" class="form-control note-description"></textarea>
      </md-input-container>
      <div class="ciuis-body-checkbox has-primary pull-left">
        <input ng-model="event_public" name="public" class="ci-public-check" id="public" type="checkbox" value="1">
        <label for="public" ng-bind='lang.publicevent'></label>
      </div>
      <div class="pull-right">
        <md-button ng-click="AddEvent()" ng-bind='lang.addevent' aria-label='Add Event'></md-button>
      </div>
    </md-content>
  </md-content>
</md-sidenav>
<md-sidenav class="md-sidenav-right md-whiteframe-4dp" md-component-id="Todo">
  <md-content layout-padding="">
    <md-content layout-padding="">
      <md-input-container class="md-icon-float md-icon-right md-block">
        <input ng-model="tododetail" placeholder="Type an to do!" class="tododetail">
        <md-icon ng-click="AddTodo()" class="ion-ios-checkmark"></md-icon>
      </md-input-container>
      <h4 md-truncate class=" text-muted text-uppercase"><strong ng-bind='lang.new'></strong></h4>
      <md-content layout-padding="">
        <md-divider></md-divider>
        <ul class="todo-item">
          <li ng-repeat="todo in todos" class="todo-alt-item todo">
            <div class="todo-c" style="display: grid;margin-top: 10px;">
              <div class="todo-item-header">
                <div class="btn-group-sm btn-space pull-right">
                  <button data-id='{{todo.id}}' ng-click='TodoAsDone($index)' class="btn btn-default btn-sm ion-checkmark"></button>
                  <button data-id='{{todo.id}}' ng-click='DeleteTodo($index)' class="btn btn-default btn-sm ion-trash-a"></button>
                </div>
                <span style="padding:5px;" class="pull-left label label-default" ng-bind="todo.date | date : 'MMM d, y h:mm:ss a'"></span> </div>
              <label ng-bind="todo.description"></label>
            </div>
          </li>
        </ul>
      </md-content>
      <h4 md-truncate class=" text-success"><strong ng-bind='lang.donetodo'></strong></h4>
      <md-content layout-padding="">
        <md-divider></md-divider>
        <ul class="todo-item-done">
          <li ng-class="{ 'donetodo-x' : todo.done }" ng-repeat="done in tododone" class="todo-alt-item-done todo">
            <div class="todo-c" style="display: grid;margin-top: 10px;">
              <div class="todo-item-header">
                <div class="btn-group-sm btn-space pull-right">
                  <button data-id='{{todo.id}}' ng-click='TodoAsUnDone($index)' class="btn btn-default btn-sm ion-refresh"></button>
                </div>
                <span style="padding:5px;" class="pull-left label label-success" ng-bind="done.date | date : 'MMM d, y h:mm:ss a'"></span></div>
              <label ng-bind="done.description"></label>
            </div>
          </li>
        </ul>
      </md-content>
    </md-content>
  </md-content>
</md-sidenav>
<md-sidenav class="md-sidenav-right md-whiteframe-4dp" md-component-id="Notifications">
  <md-toolbar class="toolbar-white">
    <div class="md-toolbar-tools">
      <md-button ng-click="close()" class="md-icon-button" aria-label="Close"><i class="ion-android-arrow-forward"></i></md-button>
      <md-truncate ng-bind='lang.notifications'></md-truncate>
      <md-button class="md-mini" aria-label="Undread Notifications"><span ng-bind="stats.tbs"></span></md-button>
    </div>
  </md-toolbar>
  <md-content>
    <md-list flex>
      <md-list-item class="md-3-line" ng-repeat="ntf in notifications" ng-click="NotificationRead($index)" ng-class="{new_notification: ntf.read == true}" aria-label="Read"> <img ng-src="{{appurl + 'uploads/images/' + ntf.avatar}}" class="md-avatar" alt="NTF" />
        <div class="md-list-item-text" layout="column">
          <h4 ng-bind="ntf.detail"></h4>
          <p ng-bind="ntf.date"></p>
        </div>
      </md-list-item>
    </md-list>
  </md-content>
</md-sidenav>
<md-sidenav class="md-sidenav-right md-whiteframe-4dp" md-component-id="Profile">
  <md-content>
    <md-tabs md-dynamic-height md-border-bottom>
      <md-tab label="Profile">
        <md-content layout-padding class="md-mt-10 text-center" style="line-height: 0px;height:200px"> <img style="border-radius: 50%; box-shadow: 0 0 20px 0px #00000014;" height="100px" width="auto" ng-src="{{appurl + 'uploads/images/' + user.avatar}}" class="md-avatar" alt="{{user.name}}" />
          <h3><strong ng-bind="user.name"></strong></h3>
          <br>
          <span ng-bind="user.email"></span></md-content>
        <md-content class="md-mt-30 text-center">
          <md-button ng-href="{{appurl + 'staff/staffmember/' + activestaff}}" class="md-raised" ng-bind='lang.profile' aria-label='Profile'></md-button>
          <md-button ng-href="{{appurl + 'login/logout'}}" class="md-raised" ng-bind='lang.logout' aria-label='LogOut'></md-button>
        </md-content>
        <md-content layout-padding>
          <md-switch ng-model="appointment_availability" ng-change="ChangeAppointmentAvailability(user.id,appointment_availability)" aria-label="Status"><strong class="text-muted" ng-bind='lang.appointment_availability'></strong></md-switch>
        </md-content>
        <md-content>
          <md-list class="md-dense" flex>
            <md-subheader class="md-no-sticky text-uppercase"><span ng-bind='lang.appointments'></span></md-subheader>
            <md-list-item class="md-3-line" ng-repeat="appointment in dashboard_appointments">
              <div class="md-avatar a64"><span ng-bind="appointment.day"></span><br>
                <span class="a65" ng-bind="appointment.aday"></span></div>
              <div class="md-list-item-text" layout="column">
                <h3 ng-bind="appointment.title"></h3>
                <p><span ng-bind="appointment.start_iso_date | date : 'MMM d, y h:mm:ss a'"></span><br>
                  <span ng-bind="appointment.staff"></span></p>
              </div>
            </md-list-item>
          </md-list>
        </md-content>
      </md-tab>
      <md-tab label="Onsite Visits">
        <md-list class="md-dense" flex>
          <md-subheader class="text-uppercase"><span ng-bind='lang.onsite_visits'></span></md-subheader>
          <md-list-item class="md-3-line" ng-repeat="meet in meetings">
            <div class="md-list-item-text" layout="column">
              <h3 ng-bind="meet.title"></h3>
              <h4 ng-bind="meet.customer"></h4>
              <p><span ng-bind="meet.date | date : 'MMM d, y h:mm:ss a'"></span><br>
                <span ng-bind="meet.staff"></span></p>
            </div>
            <md-divider></md-divider>
          </md-list-item>
        </md-list>
      </md-tab>
    </md-tabs>
  </md-content>
</md-sidenav>
<md-content class="ciuis-body-wrapper ciuis-body-fixed-sidebar" ciuis-ready>