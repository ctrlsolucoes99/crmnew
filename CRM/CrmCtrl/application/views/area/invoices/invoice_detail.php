<?php include_once(APPPATH . 'views/area/inc/header.php'); ?>
<div class="ciuis-body-content" ng-controller="Invoice_Controller">
	<div class="main-content container-fluid col-md-12">
	<md-toolbar class="toolbar-white">
	  <div class="md-toolbar-tools">
		<md-button class="md-icon-button" aria-label="Settings" ng-disabled="true">
		  <md-icon><i class="ico-ciuis-invoices text-muted"></i></md-icon>
		</md-button>
		<h2 flex md-truncate ng-bind="invoice.properties.invoice_id"></h2>
		<md-button ng-if="is_admin == 'true' " ng-click="Discussions()" class="md-icon-button" aria-label="Discussions">
			<md-tooltip md-direction="bottom">Discussions</md-tooltip>
			<md-icon><i class="mdi ion-chatboxes text-muted"></i></md-icon>
		</md-button>
		<md-button ng-href="<?php echo base_url('share/pdf/{{invoice.token}}') ?>" class="md-icon-button" aria-label="PDF">
			<md-tooltip md-direction="bottom"><?php echo lang('download') ?></md-tooltip>
			<md-icon><i class="mdi mdi-collection-pdf text-muted"></i></md-icon>
		</md-button>
		<md-button  class="md-icon-button" aria-label="Print">
			<md-tooltip md-direction="bottom"><?php echo lang('print') ?></md-tooltip>
			<md-icon><i class="mdi mdi-print text-muted"></i></md-icon>
		</md-button>
		<md-menu md-position-mode="target-right target">
		  <md-button aria-label="Open demo menu" class="md-icon-button" ng-click="$mdMenu.open($event)">
			<md-icon><i class="mdi mdi-card text-muted"></i></md-icon>
		  </md-button>
		  <md-menu-content width="4">
			<md-menu-item ng-show="settings.paypalenable == '1'">
				 <md-button ng-click="PayViaPaypal(invoice.token)">
				  <div layout="row" flex>
					<p flex><?php echo lang('pay_via_paypal') ?></p>
					<md-icon md-menu-align-target class="mdi mdi-paypal-alt" style="margin: auto 3px auto 0;"></md-icon>
				  </div>
				 </md-button>
			</md-menu-item>
			<md-menu-item ng-show="settings.authorize_enable == '1'">
				 <md-button ng-click="PayViaAuthorize(invoice.token)">
				  <div layout="row" flex>
					<p flex><?php echo lang('pay_via_authorize_net') ?></p>
					<md-icon md-menu-align-target class="ion-card" style="margin: auto 3px auto 0;"></md-icon>
				  </div>
				 </md-button>
			</md-menu-item>
		  </md-menu-content>
		</md-menu>
	  </div>
	</md-toolbar>
	<md-content class="bg-white invoice">
		<div class="invoice-header col-md-12">
			<div class="invoice-from col-md-4 col-xs-12">
				<small><?php echo  lang('from'); ?></small>
				<address class="m-t-5 m-b-5">
					<strong ng-bind="settings.company"></strong><br>
					<span ng-bind="settings.address"></span><br>
					<span ng-bind="settings.phone"></span><br>
				</address>
			</div>
			<div class="invoice-to col-md-4 col-xs-12">
				<small><?php echo  lang('to'); ?></small>
				<address class="m-t-5 m-b-5">
					<strong ng-bind="invoice.properties.customer"></strong><br>
					<span ng-bind="invoice.properties.customer_address"></span><br>
					<span ng-bind="invoice.properties.customer_phone"></span>
				</address>
			</div>
			<div class="invoice-date col-md-4 col-xs-12">
				<div class="date m-t-5" ng-bind="invoice.created | date : 'MMM d, y'"></div>
				<div class="invoice-detail">
					<span ng-bind="invoice.serie + invoice.no"></span><br>
				</div>
			</div>
		</div>
		<div class="invoice-content col-md-12 md-p-0 xs-p-0 sm-p-0 lg-p-0">
			<div class="table-responsive">
				<table class="table table-invoice">
					<thead>
						<tr>
							<th><?php echo lang('product') ?></th>
							<th><?php echo lang('quantity') ?></th>
							<th><?php echo lang('price') ?></th>
							<th><?php echo lang('tax') ?></th>
							<th><?php echo lang('discount') ?></th>
							<th><?php echo lang('total') ?></th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="item in invoice.items">
							<td><span ng-bind="item.name"></span><br><small ng-bind="item.description"></small></td>
							<td ng-bind="item.quantity"></td>
							<td ng-bind-html="item.price | currencyFormat:cur_code:null:true:cur_lct"></td>
							<td ng-bind="item.tax + '%'"></td>
							<td ng-bind="item.discount + '%'"></td>
							<td ng-bind-html="item.total | currencyFormat:cur_code:null:true:cur_lct"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="invoice-price">
				<div class="invoice-price-left">
					<div class="invoice-price-row">
						<div class="sub-price">
							<small><?php echo lang('subtotal') ?></small>
							<span ng-bind-html="invoice.sub_total | currencyFormat:cur_code:null:true:cur_lct"></span>
						</div>
						<div class="sub-price">
							<i class="ion-plus-round"></i>
						</div>
						<div class="sub-price">
							<small><?php echo lang('tax') ?></small>
							<span ng-bind-html="invoice.total_tax | currencyFormat:cur_code:null:true:cur_lct"></span>
						</div>
						<div class="sub-price">
							<i class="ion-minus-round"></i>
						</div>
						<div class="sub-price">
							<small><?php echo lang('discount') ?></small>
							<span ng-bind-html="invoice.total_discount | currencyFormat:cur_code:null:true:cur_lct"></span>
						</div>
					</div>
				</div>
				<div class="invoice-price-right">
					<small><?php echo lang('total') ?></small>
					<span ng-bind-html="invoice.total | currencyFormat:cur_code:null:true:cur_lct"></span>
				</div>
			</div>
		</div>
	</md-content>
	</div>
	<md-sidenav class="md-sidenav-right md-whiteframe-4dp" md-component-id="Discussions">
	  <md-toolbar class="toolbar-white">
	  <div class="md-toolbar-tools">
		<md-button ng-click="close()" class="md-icon-button" aria-label="Close">
			 <i class="ion-android-arrow-forward"></i>
		</md-button>
		<md-truncate>Discussions</md-truncate>
	  </div>
	  </md-toolbar>
	  <md-content class="bg-white">
		  <md-list flex>
			<md-list-item class="md-2-line" ng-repeat="discussion in discussions" ng-click="Discussion_Detail($index)" aria-label="Discussion Detail">
			  <div  data-letter-avatar="--" class="ticket-area-av-im2 md-avatar"></div>
			  <div class="md-list-item-text" ng-class="{'md-offset': phone.options.offset }">
				<h3 ng-bind="discussion.subject"></h3>
				<p ng-bind="discussion.contact"></p>
			  </div>
			<md-divider></md-divider>
			</md-list-item>
		  </md-list>
		</md-content>
	</md-sidenav>
	<div style="visibility: hidden">
<div ng-repeat="discussion in discussions" class="md-dialog-container" id="Discussion_Detail-{{discussion.id}}">
  <md-dialog aria-label="Discussion_Detail">
    <md-toolbar class="toolbar-white">
      <div class="md-toolbar-tools">
        <h2>{{discussion.subject}} by {{discussion.contact}}</h2>
        <span flex></span>
        <md-button class="md-icon-button" ng-click="CloseModal()">
          <md-icon class="ion-close-round" aria-label="Close dialog" style="color:black"></md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <md-dialog-content style="max-width:800px;max-height:810px; ">
      <md-content class="md-padding bg-white">
	   <md-list flex>
			<md-list-item>
				<md-icon class="mdi mdi-calendar"></md-icon>
				<p><?php echo lang('date')?></p>
				<p class="md-secondary" ng-bind="discussion.datecreated | date : 'MMM d, y'"></p>
			</md-list-item>
			<md-divider></md-divider>
			<md-content class="bg-white" layout-padding>
				<p class="md-secondary" ng-bind="discussion.description"></p>
			</md-content>
			<md-divider></md-divider>
		</md-list>
		<md-content class="bg-white" layout-padding>
			<section class="ciuis-notes show-notes">
			<article ng-repeat="comment in discussion.comments" class="ciuis-note-detail">
				<div class="ciuis-note-detail-img">
					<img src="<?php echo base_url('assets/img/comment.png') ?>" alt="" width="50" height="50" />
				</div>
				<div class="ciuis-note-detail-body">
					<div class="text"><p ng-bind="comment.content"></p></div>
					<p class="attribution">Replied by  <strong><span ng-bind="comment.full_name"></span></strong> at <span ng-bind="comment.created"></span></p>
				</div>
			</article>
		</section>
			<md-input-container class="md-block">
			<label><?php echo lang('message') ?></label>
			<textarea required ng-model="discussion.newcontent" placeholder="Type something" class="form-control comment-description"></textarea>
			</md-input-container>
		</md-content>
	  </md-content>
    </md-dialog-content>
    <md-dialog-actions layout="row">
      <md-button ng-click="AddComment($index)" style="margin-right:20px;" >
        <?php echo lang('reply')?>
      </md-button>
    </md-dialog-actions>
</md-dialog>
</div>
</div>
<script>
var INVOICEID = <?php echo $invoice['id']; ?>;
var INVOICECUSTOMER = <?php echo $invoice['customer_id']; ?>;
</script>
</div>
<?php include_once( APPPATH . 'views/area/inc/footer.php' );?>