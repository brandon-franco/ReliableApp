import { Component, OnInit } from '@angular/core';
import { CrudService } from './../crud.service';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-create-job-posting',
  templateUrl: './create-job-posting.page.html',
  styleUrls: ['./create-job-posting.page.scss'],
})
export class CreateJobPostingPage implements OnInit {

  jobPostings: any;
  jobTitle: string;
  creator: string;
  companyName: string;
  jobAddress: string;
  jobCity: string;
  jobState: string;
  jobPosition: string;
  jobDescription: string;
  minSalary: number;
  maxSalary: number;


  constructor(
    private afAuth: AngularFireAuth,
    private crudService: CrudService,
    private user: UserService

  ) { }

  ngOnInit() {

    this.crudService.read_JobPostings().subscribe(data => {

      this.jobPostings = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          jobTitle: e.payload.doc.data()['jobTitle'],
          companyName: e.payload.doc.data()['companyName'],
          jobAddress: e.payload.doc.data()['jobAddress'],
          jobCity: e.payload.doc.data()['jobCity'],
          jobState: e.payload.doc.data()['jobState'],
          minSalary: e.payload.doc.data()['minSalary'],
          maxSalary: e.payload.doc.data()['maxSalary'],
          jobPosition: e.payload.doc.data()['jobPosition'],
          jobDescription: e.payload.doc.data()['jobDescription'],
        }; 
      })
      console.log(this.jobPostings);

    });
  }

   CreateRecord() {
    let record = {};
    record['creator'] = this.afAuth.auth.currentUser.uid;
    record['jobTitle'] = this.jobTitle;
    record['companyName'] = this.companyName;
    record['jobAddress'] = this.jobAddress;
    record['jobCity'] = this.jobCity;
    record['jobState'] = this.jobState;
    record['jobPosition'] = this.jobPosition;
    record['jobDescription'] = this.jobDescription;
    record['minSalary'] = this.minSalary;
    record['maxSalary'] = this.maxSalary;

    this.crudService.create_NewJobPostings(record).then(resp => {
      this.jobTitle = "";
      this.companyName = "";
      this.jobAddress = "";
      this.jobCity = "";
      this.jobState = "";
      this.jobPosition = "";
      this.jobDescription = "";
      this.minSalary = undefined;
      this.maxSalary = undefined;
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_JobPostings(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditjobTitle = record.jobTitle;
    record.EditcompanyName = record.companyName;
    record.EditjobAddress = record.jobAddress;
    record.EditjobCity = record.jobCity;
    record.EditjobState = record.jobState;
    record.EditminSalary = record.minSalary;
    record.EditmaxSalary = record.maxSalary;
    record.EditjobPosition = record.jobPosition;
    record.EditjobDescription = record.jobDescription;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['jobTitle'] = recordRow.EditjobTitle;
    record['companyName'] = recordRow.EditcompanyName;
    record['jobAddress'] = recordRow.EditjobAddress;
    record['jobCity'] = recordRow.EditjobCity;
    record['jobState'] = recordRow.EditjobState;
    record['minSalary'] = recordRow.EditminSalary;
    record['maxSalary'] = recordRow.EditmaxSalary;
    record['jobPosition'] = recordRow.EditjobPosition;
    record['jobDescription'] = recordRow.EditjobDescription;
    this.crudService.update_JobPostings(recordRow.id, record);
    recordRow.isEdit = false;
  }
 
}


