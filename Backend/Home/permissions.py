# quiz/permissions.py
from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminUserOrReadOnly(BasePermission):
    """
    Allows full access to admin users.
    Allows read-only access to everyone else (unauthenticated included).
    """
    def has_permission(self, request, view):
        # Anyone can read (GET, HEAD, OPTIONS)
        if request.method in SAFE_METHODS:
            return True

        # Only admin/superuser can write (POST, PUT, PATCH, DELETE)
        return request.user and request.user.is_staff
