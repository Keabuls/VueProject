<template>
   <div class="container">
    <div class="row border p-4 my-5 rounded">
      <div class="col-9">
        <form>
          <div class="h2 text-center text-success">Create Product</div>
          <hr />
          <div class="alert alert-danger pb-0">
            Please fix the following errors:
            <ul>
              <li>Error List</li>
            </ul>
          </div>

          <div class="mt-3">
            <span class="text-muted">Name</span>
            <input type="text" class="form-control" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Description</span>
            <textarea type="text" class="form-control"></textarea>
          </div>
          <div class="mt-3">
            <span class="text-muted">Price</span>
            <input type="number" class="form-control" />
          </div>

          <div class="mt-3">
            <span class="text-muted">Sale Price</span>
            <input type="number" class="form-control" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Tags (comma-seperated)</span>
            <input
              type="text"
              class="form-control"
              placeholder="e.g., modern, classic, luxury"
            />
          </div>
          <div class="form-check form-switch pt-3">
            <input class="form-check-input" type="checkbox" role="switch" />

            <label class="form-check-label" for="bestseller">
              Bestseller
            </label>
          </div>
          <div class="mt-3">
            <label class="text-muted">Category</label>
            <select class="form-select">
              <option key="option" value="option"></option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Image</label>
            <div class="input-group">
              <input type="file" class="form-control" />
            </div>
          </div>
          <div class="pt-3">
            <button class="btn btn-success m-2 w-25">
              <span class="spinner-border spinner-border-sm me-2"></span>Submit
            </button>
            <a href="/" class="btn btn-secondary m-2 w-25"> Cancel </a>
          </div>
        </form>
      </div>
      <div class="col-3">
        <img
          :src="`https://placehold.co/600x400`"
          class="img-fluid w-100 m-3 p-3 rounded"
          alt="Product
        preview"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>
