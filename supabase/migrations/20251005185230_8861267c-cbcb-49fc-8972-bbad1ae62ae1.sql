-- Add restrictive policies to prevent unauthorized role modifications
-- Only the system (via SECURITY DEFINER functions/triggers) can modify roles

-- Deny INSERT - roles are only created via the handle_new_user() trigger
CREATE POLICY "Prevent users from inserting roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Deny UPDATE - roles cannot be changed after creation
CREATE POLICY "Prevent users from updating roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (false);

-- Deny DELETE - roles cannot be deleted
CREATE POLICY "Prevent users from deleting roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (false);