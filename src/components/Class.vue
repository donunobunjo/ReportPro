<template>
    <div>
        <div class="row justify-content-center">
            <div class="card card-default col-md-8">
                <div class="card-header">
                    <h3>Register new class</h3>
                </div>
                <div class="card-body">
                    <form id="frm">
                        <div class="row form-group">
                            <label for="class">Class</label>
                            <input type="text" id="class" class="form-control frminput" placeholder="New class ...">
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
                                        Classes
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        JS1
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        JS2
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        JS3
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