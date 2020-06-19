<template>
    <div>
        <div class="row justify-content-center">
            <div class="card card-default col-md-10">
                <div class="card-header">
                    <h3>Register Student</h3>
                </div>
                <div class="card-body">
                    <form id="frm">
                        <div class="row form-group">
                            <label for="rollNum">Roll Number</label>
                            <input type="text" id="rollNum" class="form-control frminput" placeholder="Roll Number ...">
                        </div>
                        <div class="row form-group">
                            <label for="fullName">Full Name</label>
                            <input type="text" id="fullName" class="form-control frminput" placeholder="Full Name ...">
                        </div>
                        <div class="row form-group">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="Male">
                                <label class="form-check-label" for="inlineRadio1">Male</label>
                                </div>
                                <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Female">
                                <label class="fo    rm-check-label" for="inlineRadio2">Female</label>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label for="dob">Date of Birth</label>
                            <input type="date" id="dob" class="form-control frminput">
                        </div>
                        <div class="row form-group">
                            <label for="class">Class</label>
                            <!-- <input type="text" id="" class="form-control frminput" placeholder="Full Name ..."> -->
                        </div>
                        <div class="form-group">
                            <input type="button" value="Add" class="btn btn-primary float-right">
                        </div>
                    </form>
                    

                    <hr>
                    <div class="tbl table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        Subjects
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Physics
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Economics
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Statistics
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .frminput{
            border-radius: 30px;
    }
</style>