<!DOCTYPE html>
<html ng-app="Ciuis" lang="<?php echo lang('lang_code');?>">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="">
<meta name="author" content="">
<link rel="shortcut icon" href="<?php echo base_url('assets/img/logo-fav.png'); ?>">
<title><?php echo lang('loginsystem')?></title>
<script src="<?php echo base_url('assets/lib/angular/angular.min.js'); ?>"></script>
<script src="<?php echo base_url('assets/lib/angular/angular-animate.min.js'); ?>"></script>
<script src="<?php echo base_url('assets/lib/angular/angular-aria.min.js'); ?>"></script>
<script src="<?php echo base_url('assets/lib/angular/i18n/angular-locale_'.lang('lang_code_dash').'.js'); ?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url('assets/css/ciuis.css'); ?>" type="text/css"/>
<script>var BASE_URL = "<?php echo base_url(); ?>",ACTIVESTAFF = "<?php echo $this->session->userdata('usr_id'); ?>",SHOW_ONLY_ADMIN = "false",CURRENCY = "false",LOCATE_SELECTED = "<?php echo lang('lang_code');?>",UPIMGURL = "<?php echo base_url('uploads/images/'); ?>",IMAGESURL = "<?php echo base_url('assets/img/'); ?>",SETFILEURL = "<?php echo base_url('uploads/ciuis_settings/') ?>",NTFTITLE = "<?php echo lang('notification')?>",EVENTADDEDMSG = "<?php echo lang('eventadded')?>",TODOADDEDMSG = "<?php echo lang('todoadded')?>",TODODONEMSG = "<?php echo lang('tododone')?>",REMINDERREAD = "<?php echo lang('remindermarkasread')?>",INVMARKCACELLED = "<?php echo lang('invoicecancelled')?>",TICKSTATUSCHANGE = "<?php echo lang('ticketstatuschanced')?>",LEADMARKEDAS = "<?php echo lang('leadmarkedas')?>",LEADUNMARKEDAS = "<?php echo lang('leadunmarkedas')?>",TODAYDATE = "<?php echo date('Y.m.d ')?>",LOGGEDINSTAFFID = "<?php echo $this->session->userdata('usr_id'); ?>",LOGGEDINSTAFFNAME = "<?php echo $this->session->userdata('staffname'); ?>",LOGGEDINSTAFFAVATAR = "<?php echo $this->session->userdata('staffavatar'); ?>",VOICENOTIFICATIONLANG = "<?php echo lang('lang_code_dash');?>",initialLocaleCode = "<?php echo lang('initial_locale_code');?>";</script>
</head>
<body class="ciuis-body-splash-screen" ng-controller="Ciuis_Controller">
<div class="ciuis-body-wrapper ciuis-body-login" ng-controller="Login_Controller">
  <div class="ciuis-body-content">
    <div class="col-md-4 login-left hide-xs hide-sm">
      <div class="lg-content">
        <h2><?php echo lang('logintitle')?></h2>
        <p class="text-muted"><?php echo lang('loginhelptext')?></p>
        <md-button href="http://www.ciuis.com/" class="btn btn-warning md-raised md-warn p-l-20 p-r-20"><?php echo lang('loginhelpbutton')?></md-button>
      </div>
    </div>
    <div class="main-content container-fluid col-md-8 login_page_right_block">
      <div class="splash-container">
        <div class="panel panel-default">
          <div class="panel-heading"><img src="<?php echo base_url('assets/img/logo-fav.png'); ?>" alt="logo" class="logo-img"> <?php echo lang('logintitle')?><span class="splash-description"><?php echo lang('logindescription')?></span> </div>
          <?php echo form_open('login/auth',array('name' => 'userForm')) ?>
          <div class="panel-body" >
            <md-input-container class="md-block" flex-gt-sm>
              <label><?php echo lang('loginemail')?></label>
              <input name="email" value="lance@example.com" required />
            </md-input-container>
            <md-input-container class="md-block" flex-gt-sm>
              <label><?php echo lang('password')?></label>
              <input value="demo" required type="password" name="password" class="form-control">
            </md-input-container>
            <div class="form-group row login-tools">
              <div class="col-xs-6 login-remember">
                <md-checkbox ng-model="data.cb1" aria-label="<?php echo lang('loginremember')?>"> <?php echo lang('loginremember')?> </md-checkbox>
              </div>
              <div class="col-xs-6 login-forgot-password"><a href="<?php echo base_url('login/forgot')?>"><?php echo lang('loginforget')?></a> </div>
            </div>
            <div class="form-group login-submit">
              <md-button style="margin:0px" type="submit" class="btn btn-xl md-raised md-primary"><?php echo lang('loginbutton')?></md-button>
            </div>
            <?php echo '<label class="text-danger">' . $this->session->flashdata( "error" ) . '</label>';?> </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="<?php echo base_url('assets/lib/jquery/jquery.min.js'); ?>" type="text/javascript"></script> 
<script src="<?php echo base_url('assets/lib/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js'); ?>" type="text/javascript"></script> 
<script src="<?php echo base_url('assets/lib/hoverIntent/hoverIntent.js')?>"></script> 
<script src="<?php echo base_url('assets/js/Ciuis.js'); ?>" type="text/javascript"></script> 
<script src="<?php echo base_url('assets/lib/moment.js/min/moment.min.js'); ?>" type="text/javascript"></script> 
<script src="<?php echo base_url('assets/lib/bootstrap/dist/js/bootstrap.min.js'); ?>" type="text/javascript"></script> 
<script src="<?php echo base_url('assets/lib/jquery.gritter/js/jquery.gritter.js'); ?>" type="text/javascript"></script> 
<script src="<?php echo base_url('assets/lib/datetimepicker/js/bootstrap-datetimepicker.min.js'); ?>" type="text/javascript"></script> 
<script src="<?php echo base_url('assets/lib/angular-datepicker/src/js/angular-datepicker.js'); ?>" type="text/javascript"></script> 
<script src="<?php echo base_url('assets/lib/select2/js/select2.min.js'); ?>" type="text/javascript"></script> 
<script src="<?php echo base_url('assets/lib/select2/js/select2.full.min.js'); ?>" type="text/javascript"></script> 
<script src="<?php echo base_url('assets/lib/chartjs/dist/Chart.bundle.js'); ?>" type="text/javascript"></script> 
<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.0/Chart.js'></script> 
<script src="<?php echo base_url('assets/lib/highcharts/highcharts.js')?>"></script> 
<script src="<?php echo base_url('assets/lib/material/angular-material.min.js')?>"></script> 
<script src="<?php echo base_url('assets/lib/currency-format/currency-format.min.js')?>"></script> 
<script src="<?php echo base_url('assets/lib/angular-datetimepicker/angular-material-datetimepicker.min.js')?>"></script> 
<script src="<?php echo base_url('assets/lib/scheduler/scheduler.min.js'); ?>"></script> 
<script src="<?php echo base_url('assets/js/CiuisAngular.js'); ?>"></script>
<?php if ( $this->session->flashdata('ntf1')) {?>
<script type="text/javascript">
		$.gritter.add( {
			title: '<b><?php echo lang('notification')?></b>',
			text: '<?php echo $this->session->flashdata('ntf1'); ?>',
			class_name: 'color success'
		} );
	</script>
<?php }?>
<?php if ( $this->session->flashdata('ntf2')) {?>
<script type="text/javascript">
		$.gritter.add( {
			title: '<b><?php echo lang('notification')?></b>',
			text: '<?php echo $this->session->flashdata('ntf2'); ?>',
			class_name: 'color primary'
		} );
	</script>
<?php }?>
<?php if ( $this->session->flashdata('ntf3')) {?>
<script type="text/javascript">
		$.gritter.add( {
			title: '<b><?php echo lang('notification')?></b>',
			text: '<?php echo $this->session->flashdata('ntf3'); ?>',
			class_name: 'color warning'
		} );
	</script>
<?php }?>
<?php if ( $this->session->flashdata('ntf4')) {?>
<script type="text/javascript">
		$.gritter.add( {
			title: '<b><?php echo lang('notification')?></b>',
			text: '<?php echo $this->session->flashdata('ntf4'); ?>',
			class_name: 'color danger'
		} );
	</script>
<?php }?>
</body>
</html>