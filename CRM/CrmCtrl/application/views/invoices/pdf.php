<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>
		<?php echo '' . $invoice['id'] . '-' . date( 'M-d-Y H:i:s' ) . '';?>
	</title>
	<link rel='stylesheet prefetch' href='https://cdn.materialdesignicons.com/1.1.34/css/materialdesignicons.min.css'>
	<link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css'>
	<style>
		.list-group-item.active,
		.list-group-item.active:focus,
		.list-group-item.active:hover {
			z-index: 2;
			color: #fff;
			background-color: #555;
			border-color: #555;
		}
	</style>
</head>
<?php
if ( $invoice[ 'customercompany' ] === NULL ) {
	$customer = $invoice[ 'namesurname' ];
} else $customer = $invoice[ 'customercompany' ];
?>

<body>
	<div class="container">
		<div class="row">
			<div class="page-header">
				<img height="75px" src="<?php echo base_url('assets/img/logo.png')?>" alt="">
				<small class="pull-right" style="position:relative;top:20px;right:20px;"><strong><span class="text-uppercase"><?php echo lang('invoice') ?></span> <br># <?php echo '' . lang( 'invoiceprefix' ) . '-' . str_pad( $invoice['id'], 6, '0', STR_PAD_LEFT ) . '' ?><br> <?php echo ''. lang( 'serie' ) . ': ' . $invoice['serie'] . '-' . str_pad( $invoice['no'], 6, '0', STR_PAD_LEFT ) . '' ?></strong></small>
			</div>
			<div class="col-md-12 nav panel" style="padding-bottom: 20px">
				<div class="col-md-6 col-sm-6 col-xs-6" style="padding: 0">
					<strong><?php echo lang('from') ?></strong><br>
					<hr>
					<small>
						<strong><?php echo $settings['company']; ?></strong>
					</small>
				


					<br>
					<small>
						<?php echo '' . $settings[ 'zipcode' ] . '/ ' . $settings[ 'town' ] . '/' . $settings[ 'city' ] . ', ' . $settings[ 'country' ] . '' ?>
					</small><br>
					<small>
						<?php echo $settings[ 'phone' ]; ?>
					</small><br>
					<small>
						<strong><?php echo lang('taxoffice') ?>: </strong><?php echo $settings[ 'taxoffice' ]; ?>
					</small><br>
					<small>
						<?php echo '<strong>' . lang( 'vatnumber' ) . ': </strong>' . $settings[ 'vatnumber' ] . ''; ?>
					</small>
				</div>
				<div class="col-md-6 col-sm-6 col-xs-6" style="padding: 0">
					<strong><?php echo lang('billed_to') ?></strong><br>
					<hr>
					<small>
						<strong><?php echo $customer; ?></strong>
					</small>
					<br>
					<small>
						<?php echo $invoice[ 'billing_street' ]; ?> / <?php echo $invoice[ 'billing_city' ]; ?> / <?php echo $invoice[ 'billing_state' ]; ?> / <?php echo $invoice[ 'billing_zip' ]; ?> / <?php echo $invoice[ 'inv_billing_country' ]; ?>
					</small><br>
					<small>
						<?php echo $invoice[ 'phone' ]; ?>
					</small><br>
					<small>
						<strong><?php echo lang('taxoffice') ?>: </strong><?php echo $invoice[ 'taxoffice' ]; ?>
					</small><br>
					<small>
						<strong><?php echo lang('vatnumber') ?>: </strong><?php echo $invoice[ 'taxnumber' ]; ?>
					</small>
				</div>
			</div>
			<table class="table panel">
				<thead>
					<tr>
						<th class="col-md-6">
							<?php echo  lang( 'invoiceitemdescription' ) ?>
						</th>
						<th class="col-md-1">
							<?php echo  lang( 'quantity' ) ?>
						</th>
						<th class="col-md-1">
							<?php echo  lang( 'price' ) ?>
						</th>
						<th class="col-md-1">
							<?php echo  lang( 'discount' ) ?>
						</th>
						<th class="col-md-1">
							<?php echo  lang( 'vat' ) ?>
						</th>
						<th class="col-md-2">
							<?php echo  lang( 'total' ) ?>
						</th>
					</tr>
				</thead>
				<tbody>
					<?php foreach($items as $item){ ?>
					<tr>
						<td class="text-left">
							<?php echo '' . $item[ 'name' ] . '</b><br><small style="font-size:10px;line-height:10px">' . $item[ 'description' ] . '</small>'; ?>
						</td>
						<td class="text-left">
							<?php echo '' . number_format( $item[ 'quantity' ], 2, '.', ',' ) . '' ?>
						</td>
						<td class="text-left">
							<?php echo '' . number_format( $item[ 'price' ], 2, '.', ',' ) . ''; ?>
						</td>
						<td class="text-left">
							<?php echo '' . $item[ 'discount' ] . '%';?>
						</td>
						<td class="text-left">
							<?php echo '' . number_format( $item[ 'tax' ], 2, ',', '.' ) . '%';?>
						</td>
						<td class="text-left">
							<?php echo '' . number_format( $item[ 'total' ], 2, '.', ',' ) . ' ' . currency . '';?>
						</td>
					</tr>
					<?php } ?>
				</tbody>
			</table>
			<div class="col-md-12 col-xs-12 col-sm-12 panel" style="padding:0px">
				<div class="col-md-6 col-xs-6 col-sm-6 panel pull-left" style="padding: 0px;">
					<?php if ($invoice[ 'duenote' ]){echo '<div class="panel panel-warning"><div class="panel-heading text-uppercase"><strong>'. lang('duenote').' </strong></div><table style="width:100%;border:none;"><tr style="width:100%;"><td style="width:50%;"><li class="list-group-item"><small>'.$invoice[ 'duenote' ].'</small></li></td></tr></table></div>';} ?>
					<div class="panel panel-default">
						<div class="panel-heading text-uppercase">
							<strong>
								<?php echo $settings[ 'termtitle' ] ?>
							</strong>
						</div>
						<table style="width:100%;border:none;">
							<tr style="width:100%;">
								<td style="width:50%;">
									<li class="list-group-item">
										<small>
											<?php echo $settings['termdescription'] ?>
										</small>
									</li>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="col-md-5 col-xs-5 col-sm-5 pull-right" style="padding: 0">
					<div class="list-group">
						<li class="list-group-item">
							<strong>
								<?php echo lang( 'subtotal' ); ?>
							</strong>
							<span class="pull-right">
								<?php echo '' . number_format( $invoice[ 'sub_total' ], 2, '.', ',' ) . ' ' . currency . '' ?>
							</span>
						</li>
						<li class="list-group-item">
							<strong>
								<?php echo lang( 'linediscount' ); ?>
							</strong>
							<span class="pull-right">
								<?php echo '' . number_format( $invoice[ 'total_discount' ], 2, '.', ',' ) . ' ' . currency . '' ?>
							</span>
						</li>
						<li class="list-group-item">
							<strong>
								<?php echo lang( 'tax' ); ?>
							</strong>
							<span class="pull-right">
								<?php echo '' . number_format( $invoice[ 'total_tax' ], 2, '.', ',' ) . ' ' . currency . '' ?>
							</span>
						</li>
						<li class="list-group-item active">
							<strong>
								<?php echo lang( 'total' ); ?>
							</strong>
							<span class="pull-right">
								<?php echo '' . number_format( $invoice[ 'total' ], 2, '.', ',' ) . ' ' . currency . ''; ?>
							</span>
						</li>
					</div>
				</div>
			</div>
			
		</div>
		<?php if ($invoice[ 'shipping_street' ]){echo '<div class="row"><div class="col-md-12 col-xs-12 col-sm-12 panel" style="padding-bottom: 20px">     <strong>'.lang('ship_to').'</strong><br><hr><small><strong>'.$customer.'</strong></small><br><small>'.$invoice[ 'shipping_street' ].' / '.$invoice[ 'shipping_city' ].' / '.$invoice[ 'shipping_state' ].' / '.$invoice[ 'shipping_zip' ].' / '.$invoice[ 'inv_shipping_country' ].'</small></div></div>';} ?>
	</div>
</body>
</html>