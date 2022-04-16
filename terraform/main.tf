terraform {
  required_version = ">= 0.13"

  required_providers {
    # Cloud Run support was added on 3.3.0
    google = ">= 3.3"
  }
}

provider "google" {
  project = "black-alpha-346312"
}


# Enables the Cloud Run API
#resource "google_project_service" "run" {
#  service            = "run.googleapis.com"
#  disable_on_destroy = false
#}


# Create the Cloud Run service
resource "google_cloud_run_service" "app" {
  name     = "naya-api1"
  location = var.gcp_region

  # Waits for the Cloud Run API to be enabled
#  depends_on = [google_project_service.run]

  metadata {
    annotations = {
      "run.googleapis.com/client-name" = "terraform"
      "client.knative.dev/user-image" = "gcr.io/cloudrun/placeholder"

    }
  }

  template {

    spec {
      containers {
        image = var.image_name

        env {
          name = MONGO_URI
          value = "mongodb://root:Vmnqjrvkv5Zc@3.111.46.209:27017/?authSource=admin"
        }
        env {
          name = env
          value = "prod"
        }
        
        ports {
          container_port = var.port
        }

        resources {
          limits = {
            cpu    = "1"
            memory = "1Gi"
          }
        }
      }

    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
  deletion_protection  = "true"
}



data "google_iam_policy" "noauth" {
  binding {
    role    = "roles/run.invoker"
    members = ["allUsers"]
  }
}



resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.app.location
  project     = google_cloud_run_service.app.project
  service     = google_cloud_run_service.app.name
  policy_data = data.google_iam_policy.noauth.policy_data
}



# Display the service URL
output "service_url" {
  value = google_cloud_run_service.app.status[0].url
}

