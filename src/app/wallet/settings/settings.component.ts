import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { PrivateKeyDialog } from '../../core/private-key/private-key.component';
import { RecoveryPhraseDialog } from '../../core/recovery-phrase/recovery-phrase.component';
import { AccountService } from '../../core/services/account.service';
import { Web3Service } from '../../core/services/web3.service';
import { TokenService } from '../../core/services/token.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
  account;
  brainKey:string;
	constructor(private route:ActivatedRoute,
              private web3:Web3Service,
              public dialog: MatDialog,
              private accountService: AccountService,
              public translateService:TranslateService,
              private snackBar: MatSnackBar) {

  }
  
  ngOnInit(){
    this.account = this.accountService.accountInfo;
    this.brainKey= this.accountService.brainKeyEncrypted;
  }

	backupPrivateKey(backup) {
		const dialogRef = this.dialog.open(PrivateKeyDialog, {
  		width: '960px',
      panelClass: 'wallet-dialog',
      data:{backup:backup}
  	});
	}

  backupRecoveryPhrase(backup) {
    const dialogRef = this.dialog.open(RecoveryPhraseDialog, {
      width: '870px',
      panelClass: 'wallet-dialog',
      data:{backup:backup}
    });
  }

  copy(){
    var input = document.createElement('input');
    input.setAttribute('value', this.account.address);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    //snackbar open

    this.snackBar.open(this.translateService.instant('wallet.copied'), null, {duration: 1000});
  }
}
